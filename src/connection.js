// @flow

import EventEmitter from 'events';
import {Client} from 'ssh2';
import keypair from 'keypair';
import forge from 'node-forge';
import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import fs from 'fs';

const keyDir = path.join(os.homedir(), '.ssh');
mkdirp.sync(keyDir); // make ~/.ssh folder if necessary
const privKeyPath = path.join(keyDir, 'seaside_rsa');
const pubKeyPath = path.join(keyDir, 'seaside_rsa.pub');

function getPublicKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(privKeyPath) && fs.existsSync(pubKeyPath)) {
      // The keypair exists
      fs.readFile(pubKeyPath, (err, contents) => {
        if (err) return reject(err);
        resolve(contents.toString());
      });
    } else {
      // create the keypair
      const pair = keypair({bits: 2048});
      const pubKey = forge.pki.publicKeyFromPem(pair.public);
      const pubKeyText = forge.ssh.publicKeyToOpenSSH(pubKey, 'seaside');
      // save the keypair
      fs.writeFile(privKeyPath, pair.private, err => {
        if (err) return reject(err);
        fs.writeFile(pubKeyPath, pubKeyText, err => {
          if (err) return reject(err);
          resolve(pubKeyText);
        });
      });
    }
  });
}

export default class Connection extends EventEmitter {
  server: string;
  client: Client;
  stream: ?*;

  constructor(server: string) {
    super();
    this.server = server;
    this.client = new Client();
  }

  attemptLogin(username: string, password: string): Promise<*> {
    return new Promise((resolve, reject) => {
      this.client.on('error', err => {
        // Authentication failed
        reject(err);
      });
      this.client.on('ready', () => {
        // Authentication Successful
        this.initializeShell()
          .then(resolve)
          .catch(reject);
      });
      this.client.connect({
        host: this.server,
        username,
        password
      });
    });
  }

  write(data: string) {
    if (this.stream)
      this.stream.write(data);
  }

  resize(rows: number, cols: number) {
    if (this.stream)
      this.stream.setWindow(rows, cols, 0, 0);
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
}
