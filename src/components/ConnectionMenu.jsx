// @flow
import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react';
import ServerSelector from './ServerSelector';
import {bind} from 'decko';
import serverConfig from '../config/servers.json';

type Props = {
  onConnect: (server: string) => void,
};

type State = {
  server: string
};

export default class ConnectionMenu extends Component<Props, State> {
  state = {
    server: serverConfig.defaultServer
  };

  @bind handleClick() {
    this.props.onConnect(this.state.server);
  }

  @bind handleChange(server: string) {
    this.setState({server});
  }

  render() {
    return (
      <Grid.Row columns={2}>
        <Grid.Column>
          <Button fluid onClick={this.handleClick}>
            Connect
          </Button>
        </Grid.Column>
        <Grid.Column>
          <ServerSelector selection={this.state.server} onChange={this.handleChange}/>
        </Grid.Column>
      </Grid.Row>
    );
  }
}