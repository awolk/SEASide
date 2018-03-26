// @flow
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import ServerSelector from './ServerSelector';
import configuration from '../SaveData';
import { servers } from '../config/servers';

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
      <Menu.Menu position='right'>
        <ServerSelector selection={this.state.serverIndex} onChange={this.handleChange}/>

        <Menu.Item>
          <Button onClick={this.handleClick}>Connect</Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}