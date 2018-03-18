import React, {Component} from 'react';
import {Terminal as XTerm} from 'xterm';
import 'xterm/dist/xterm.css';
import {Client} from 'ssh2';
import {bind, debounce} from 'decko';

XTerm.applyAddon(require('xterm/dist/addons/fit/fit'));

export default class Terminal extends Component {
  componentDidMount() {
    // Create XTerm element
    this.xterm = new XTerm();
    this.xterm.open(this.termElement);
    this.resize();
    // Open connection
    this.client = new Client();
    this.client.on('ready', () => {
      this.client.shell({
          term: 'xterm-256color',
          rows: this.xterm.rows,
          cols: this.xterm.cols
        },
        (err, stream) => {
          if (err) throw err;
          stream.on('data', (data) => {
            this.xterm.write(data.toString('utf-8'));
          });
          stream.on('close', () => {
            this.stream = null;
            this.client.end();
          });

          this.stream = stream;
        });
    }).connect({
      host: this.props.host,
      username: this.props.username,
      password: this.props.password
    });

    this.xterm.on('data', key => {
      if (this.stream)
        this.stream.stdin.write(key);
    });
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    if (this.xterm) {
      this.xterm.destroy();
      this.xterm = null;
    }
    window.removeEventListener('resize', this.resize);
  }

  @bind
  @debounce
  resize() {
    if (this.xterm)
      this.xterm.fit();
    if(this.stream)
      this.stream.setWindow(this.xterm.rows, this.xterm.cols, 0, 0);
  }


  render() {
    return (
      <div ref={termElement => this.termElement = termElement}/>
    );
  }
}