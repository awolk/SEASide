// @flow
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Segment, Menu} from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import MasterTab from "./MasterTab";
import serverConfig from '../config/servers.json';

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

  handleConnect = (server: string) => {
    const newTab = <MasterTab host={server}/>; // username=''  to attempt public key authentication
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      tabIndex: this.state.tabs.length
    });
  };

  handleChangeTab = (tabIndex: number) => {
    this.setState({
      tabIndex
    });
  };

  render() {
    return (
      <div style={{height: '100%'}}>
        <Menu attached='top'>
          {this.state.tabs.map((tab, i) =>
            <Menu.Item
              key={i}
              active={i === this.state.tabIndex}
              onClick={this.handleChangeTab.bind(this, i)}
              content={this.state.tabs[i]}
            >
              {tab.props.host}
            </Menu.Item>
          )}
          <ConnectionMenu onConnect={this.handleConnect}/>
        </Menu>
        {this.state.tabs.map((tab, i) =>
          <Segment attached='bottom' hidden={this.state.tabIndex !== i}>
            {this.state.tabs[i]}
          </Segment>
        )}
      </div>
    );
  }
};