// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { servers } from '../config/servers.json';
const dropdownItems = servers.map((server, i) => ({text: server.name, value: i}));

type Props = {
  onChange: (serverIndex: number) => void,
  selection: number
};

export default class ServerSelector extends Component<Props> {
  handleChange = (event: *, data: *) => {
    this.props.onChange(data.value);
  };

  render() {
    return (
      <Dropdown item basic
                value={this.props.selection}
                options={dropdownItems}
                onChange={this.handleChange}
      />
    );
  }
}