import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Grid} from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import Terminal from './Terminal';
import serverConfig from '../config/servers.json';
import {bind} from 'decko';

export default class MainWindow extends Component {
  state = {
    tabs: [],
    serverSelection: serverConfig.defaultServer
  };

  @bind
  handleConnect(server) {
    const newTab = <Terminal
      key={this.state.tabs.length}
      host={server}
      username=''
      password=''
    />;
    this.setState({
      tabs: this.state.tabs.concat(newTab)
    });
  }

  render() {
    return (
      <div>
        <Grid padded>
          <ConnectionMenu onConnect={this.handleConnect}/>
          <Grid.Row stretched>
            {this.state.tabs}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};