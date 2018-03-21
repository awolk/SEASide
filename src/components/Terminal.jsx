import React, {Component} from 'react';
import {Terminal as XTerm} from 'xterm';
import 'xterm/dist/xterm.css';
import {bind, debounce} from 'decko';

XTerm.applyAddon(require('xterm/dist/addons/fit/fit'));

export default class Terminal extends Component {
  componentDidMount() {
    // Create XTerm element
    const xterm = new XTerm();
    this.xterm = xterm;
    xterm.open(this.termElement);
    this.resize();
    // Receive data from connection
    this.props.connection.on('data', data => {
      this.xterm.write(data);
    });

    this.xterm.on('data', key => {
      this.props.connection.write(key);
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

  @bind @debounce
  resize() {
    if (this.xterm)
      this.xterm.fit();
    this.props.connection.resize(this.xterm.rows, this.xterm.cols);
  }


  render() {
    return (
      <div style={{width: '100%'}} ref={termElement => this.termElement = termElement}/>
    );
  }
}