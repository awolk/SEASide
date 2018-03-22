// @flow
import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Tab } from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import MasterTab from "./MasterTab";
import serverConfig from '../config/servers.json';
import {bind} from 'decko';

type State = {
  tabs: Array<*>,
  serverSelection: string,
  tabIndex: number
};

export default class MainWindow extends Component<{}, State> {
  state = {
    tabs: [],
    serverSelection: serverConfig.defaultServer,
    tabIndex: 0
  };

  componentDidMount() {
    this.handleConnect(serverConfig.defaultServer);
  }

  @bind handleConnect(server: string) {
    const newTab = <MasterTab host={server}/>;
    this.setState({
      tabs: this.state.tabs.concat({
        menuItem: server,
        pane: {
          key: this.state.tabs.length,
          content: newTab
        }
      }),
      tabIndex: this.state.tabs.length
    });
  }

  @bind handleTabChange(evt: *, data: *) {
    this.setState({tabIndex: data.activeIndex});
  }

  render() {
    return (
      <div>
        <Grid padded>
          <ConnectionMenu onConnect={this.handleConnect}/>
          <Grid.Row stretched centered padded>
            <Tab
              panes={this.state.tabs}
              renderActiveOnly={false}
              activeIndex={this.state.tabIndex}
              onTabChange={this.handleTabChange}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};