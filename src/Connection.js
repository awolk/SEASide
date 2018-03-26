// @flow

import EventEmitter from 'events';
import { Client } from 'ssh2';
import forge from 'node-forge';
import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { SSH2Stream, SFTPStream } from 'ssh2-streams';

const keyDir = path.join(os.homedir(), '.ssh');
mkdirp.sync(keyDir); // make ~/.ssh folder if necessary
const privKeyPath = path.join(keyDir, 'seaside_rsa');
const pubKeyPath = path.join(keyDir, 'seaside_rsa.pub');

function getPublicKey(): Promise<string> {
  // creates keypair if necessary, and fetches public key
  return new Promise((resolve, reject) => {

    if (fs.existsSync(privKeyPath) && fs.existsSync(pubKeyPath)) {
      // The keypair exists
      fs.readFile(pubKeyPath, (err, contents) => {
        if (err) return reject(err);

        resolve(contents.toString());
      });
    } else {
      // create the keypair
      forge.pki.rsa.generateKeyPair({bits: 2048, workers: -1}, function(err, keypair) {
        if (err)
          return reject(err);

        const privKeyText = forge.pki.privateKeyToPem(keypair.privateKey);
        const pubKeyText = forge.ssh.publicKeyToOpenSSH(keypair.publicKey, 'seaside');
        // save the keypair
        fs.writeFile(privKeyPath, privKeyText, { mode: 0o600 }, err => {
          if (err) return reject(err);
          fs.writeFile(pubKeyPath, pubKeyText, { mode: 0o644 },  err => {
            if (err) return reject(err);
            resolve(pubKeyText);
          });
        });
      });
    }

  });
}

export default class Connection extends EventEmitter {
  server: string;
  client: Client;
  stream: ?SSH2Stream;
  sftp: ?SFTPStream;

  constructor(server: string) {
    super();
    this.server = server;
    this.client = new Client();
  }

  attemptLogin(username: string, password?: string): Promise<void> {
    return this.attemptKeyLogin(username) // try key login first (Just in case)
      .catch(err => {
        // key login failed
        // attempt regular login, and setup key login for the future
        return new Promise((resolve, reject) => {
          this.client.on('error', err => {
            // Authentication failed
            reject(err);
          });
          this.client.on('ready', () => {
            // Authentication Successful
            this.setup()                   // Initialize Shell/SFTP
              .then(getPublicKey)          // Fetch public key
              .then(this.installPublicKey) // Install public key authentication
              .then(resolve)
              .catch(reject);
          });
          this.client.connect({
            host: this.server,
            username,
            password
          });
        });
      });
  }

  attemptKeyLogin(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      getPublicKey() // ensure the necessary keypair exists
        .then(pubKey => {
          this.client.on('error', err => {
            reject(err);
          });
          this.client.on('ready', () => {
            // Authentication Successful
            this.setup()       // Initialize Shell/SFTP
              .then(resolve)
              .catch(reject);
          });
          this.client.connect({
            host: this.server,
            username,
            privateKey: fs.readFileSync(privKeyPath).toString()
          });
        })
        .catch(reject);
    })
  }

  write(data: string) {
    if (this.stream)
      this.stream.write(data);
  }

  resize(rows: number, cols: number) {
    if (this.stream)
      this.stream.setWindow(rows, cols, 0, 0);
  }

  setup(): Promise<void> {
    return this
      .initializeShell()
      .then(this.initializeSFTP);
  }

  initializeShell(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.shell({
          term: 'xterm-256color',
          rows: 24,
          cols: 80
        },
        (err, stream) => {
          if (err) return reject(err);

          stream.on('data', (data) => {
            this.emit('data', data.toString());
          });
          stream.on('close', () => {
            this.stream = null;
            this.client.end();
          });

          this.stream = stream;
          resolve();
        });
    });
  }

  initializeSFTP = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.client.sftp((err, sftp) => {
        if (err) return reject(err);

        this.sftp = sftp;
        resolve();
      })
    });
  };

  installPublicKey = (pubKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.sftp)
        return reject();
      const sftp: SFTPStream = this.sftp; // resolve optional

      const writeKey = () => {
        const stream: * = sftp.createWriteStream('./.ssh/authorized_keys', { flags: 'a', mode: 0o600 });
        stream.write(pubKey.trim() + '\n');
        stream.close();
        resolve();
      };

      sftp.stat('./.ssh', (err, stats) => {
        if (err && err.code === SFTPStream.STATUS_CODE.NO_SUCH_FILE) {
          // create ssh if necessary
          sftp.mkdir('./.ssh', err => {
            if (err) return reject(err);
            writeKey();
          })
        } else if (err) {
          return reject(err);
        } else {
          writeKey();
        }
      });
    });
  }
}
