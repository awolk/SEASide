// @flow
import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {bind} from 'decko';

import serverConfig from '../config/servers.json';

type Props = {
  onChange: (server: string) => void,
  selection: string
};

export default class ServerSelector extends Component<Props> {
  @bind handleChange(event: *, data: *) {
    if (this.props.onChange)
      this.props.onChange(data.value);
  }

  render() {
    const items = serverConfig.servers.map(server => ({text: server.name, value: server.address}));
    return (
      <Dropdown fluid selection
                value={this.props.selection}
                options={items}
                onChange={this.handleChange}
      />
    );
  }
}