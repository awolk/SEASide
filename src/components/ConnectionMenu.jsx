import React, {Component} from 'react';
import {Button} from 'material-ui';
import ServerSelector from './ServerSelector';

import {bind} from 'decko';

import serverConfig from '../config/servers.json';

export default class ConnectionMenu extends Component {
  state = {
    server: serverConfig.defaultServer
  };

  @bind
  handleClick() {
    if (this.props.onConnect)
      this.props.onConnect(this.state.server);
  }

  @bind
  handleChange(server) {
    this.setState({server});
  }

  render() {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleClick}
        >
          Connect
        </Button>
        <ServerSelector selection={this.state.server} onChange={this.handleChange} />
      </div>
    );
  }
}