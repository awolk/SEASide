import React, {Component} from 'react';
import {Select} from 'material-ui';
import {bind} from 'decko';

import serverConfig from '../config/servers.json';

export default class ServerSelector extends Component {
  @bind
  handleChange(event, index, selection) {
    alert(selection);
    if (this.props.onChange)
      this.props.onChange(selection);
  }

  render() {
    return (
      <Select native value={this.props.selection} onChange={this.handleChange}>
        {serverConfig.servers.map((server, i) => (
          <option key={i} value={server.address}>{server.name}</option>
        ))}
      </Select>
    );
  }
}