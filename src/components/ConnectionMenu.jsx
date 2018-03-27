// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import ServerSelector from './ServerSelector';
import configuration from '../SaveData';
import { servers } from '../config/servers';

const Button = styled.button``;

type Props = {
  onConnect: (server: string, name: string) => void,
};

type State = {
  serverIndex: number
};

export default class ConnectionMenu extends Component<Props, State> {
  state = {
    serverIndex: configuration.serverIndex
  };

  handleClick = () => {
    const server = servers[this.state.serverIndex];
    this.props.onConnect(server.address, server.name);
  };

  handleChange = (serverIndex: number) => {
    configuration.serverIndex = serverIndex; // save server choice
    this.setState({serverIndex});
  };

  render() {
    return (
      <div>
        <ServerSelector selection={this.state.serverIndex} onChange={this.handleChange}/>
        <Button onClick={this.handleClick}>Connect</Button>
      </div>
    );
  }
}