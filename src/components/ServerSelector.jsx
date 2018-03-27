// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { servers } from '../config/servers.json';
const dropdownItems = servers.map((server, i) => ({text: server.name, value: i}));

const Select = styled.select``;

type Props = {
  onChange: (serverIndex: number) => void,
  selection: number
};

export default class ServerSelector extends Component<Props> {
  handleChange = (event: *, data: *) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <Select onChange={this.handleChange}>
        {dropdownItems.map((item, i) =>
          <option value={item.value}>{item.text}</option>
        )}
      </Select>
    );
  }
}