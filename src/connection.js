import {EventEmitter} from 'events';
import {Client} from 'ssh2';

export default class Connection extends EventEmitter {
  constructor(server) {
    super();
    this.server = server;
    this.client = new Client();
  }

  attemptLogin(username, password) {
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

  write(data) {
    if (this.stream)
      this.stream.write(data);
  }

  resize(rows, cols) {
    if (this.stream)
      this.stream.setWindow(rows, cols, 0, 0);
  }

  initializeShell() {
    return new Promise((resolve, reject) => {
      this.client.shell({
          term: 'xterm-256color',
          rows: 24,
          cols: 80
        },
        (err, stream) => {
          if (err) return reject(err);

          stream.on('data', (data) => {
            this.emit('data', data.toString('utf-8'));
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
