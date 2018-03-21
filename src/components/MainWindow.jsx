import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Tab } from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import MasterTab from "./MasterTab";
import serverConfig from '../config/servers.json';
import {bind} from 'decko';

export default class MainWindow extends Component {
  state = {
    tabs: [],
    serverSelection: serverConfig.defaultServer,
    tabIndex: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleConnect(serverConfig.defaultServer);
  }

  @bind handleConnect(server) {
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

  @bind handleTabChange(evt, data) {
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