import React, { Component } from 'react';
import {Button, Select, Grid} from 'material-ui';

import {XTerm} from 'react-xterm';
import 'xterm/dist/xterm.css';

import {Client} from 'ssh2';

class App extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={40} justify="center">
          <Grid item xs={6}>
            <Button variant="raised" color="primary">
              Connect
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Select native value="lnxsrv">
              <option value="lnxsrv.seas.ucla.edu">lnxsrv</option>
              <option value="lnxsrv07.seas.ucla.edu">lnxsrv07</option>
              <option value="lnxsrv09.seas.ucla.edu">lnxsrv09</option>
            </Select>
          </Grid>
          <Grid item>
            <XTerm
              ref={term => this.term = term}
              onInput={this.termInput.bind(this)}
              style={{
                addons: ['fit', 'fullscreen', 'search']
              }} />
          </Grid>
        </Grid>
      </div>
    );
  }

  termInput(input) {
    if (this.stdin) {
      this.stdin.write(input);
    }
  }

  componentDidMount() {
    this.client = new Client();
    this.client.on('ready', () => {
      this.client.shell({
          term: 'xterm-256color'
        },
        (err, stream) => {
        if (err) throw err;
        stream.on('data', (data) => {
          this.term.write(data.toString('utf-8'));
        });
        this.stdin = stream.stdin;
      });
    }).connect({
      host: 'lnxsrv07.seas.ucla.edu',
      username: '',
      password: ''
    });
  }
}

export default App;
