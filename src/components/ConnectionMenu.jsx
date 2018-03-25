// @flow
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import ServerSelector from './ServerSelector';
import { defaultServer } from '../config/servers.json';

type Props = {
  onConnect: (server: string, name: string) => void,
};

type State = {
  server: string,
  name: string
};

export default class ConnectionMenu extends Component<Props, State> {
  state = {
    server: defaultServer.address,
    name: defaultServer.name
  };

  handleClick = () => {
    this.props.onConnect(this.state.server, this.state.name);
  };

  handleChange = (server: string, name: string) => {
    this.setState({server, name});
  };

  render() {
    return (
      <Menu.Menu position='right'>
        <ServerSelector selection={this.state.name} onChange={this.handleChange}/>

        <Menu.Item>
          <Button onClick={this.handleClick}>Connect</Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}