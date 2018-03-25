// @flow
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import ServerSelector from './ServerSelector';
import serverConfig from '../config/servers.json';

type Props = {
  onConnect: (server: string, name: string) => void,
};

type State = {
  server: string
};

export default class ConnectionMenu extends Component<Props, State> {
  state = {
    server: serverConfig.defaultServer
  };

  handleClick = () => {
    this.props.onConnect(this.state.server, serverConfig.servers);
  };

  handleChange = (server: string) => {
    this.setState({server});
  };

  render() {
    return (
      <Menu.Menu position='right'>
        <ServerSelector selection={this.state.server} onChange={this.handleChange}/>

        <Menu.Item>
          <Button onClick={this.handleClick}>Connect</Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}