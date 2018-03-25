// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import serverConfig from '../config/servers.json';
const serverMap: Map<string, string> = new Map();
for (const server of serverConfig.servers)
  serverMap.set(server.name, server.address);

type Props = {
  onChange: (server: string, name: string) => void,
  selection: string
};

export default class ServerSelector extends Component<Props> {
  handleChange = (event: *, data: *) => {
    const name = data.value;
    const server = serverMap.get(name) || '';
    if (this.props.onChange)
      this.props.onChange(server, name);
  };

  render() {
    const items = serverConfig.servers.map(server => ({text: server.name, value: server.name}));
    return (
      <Dropdown item basic
                value={this.props.selection}
                options={items}
                onChange={this.handleChange}
      />
    );
  }
}