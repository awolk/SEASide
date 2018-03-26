// @flow
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Menu } from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import MasterTab from "./MasterTab";
import configuration from '../SaveData';
import { servers } from '../config/servers';

type State = {
  tabs: Array<*>,
  tabIndex: number
};

export default class MainWindow extends Component<{}, State> {
  state = {
    tabs: [],
    tabIndex: 0
  };

  componentDidMount() {
    const startingServer = servers[configuration.serverIndex];
    this.handleConnect(startingServer.address, startingServer.name);
  }

  handleConnect = (server: string, name: string) => {
    const newTab = <MasterTab host={server} name={name} username={configuration.username}/>;
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
            >
              {tab.props.name}
            </Menu.Item>
          )}
          <ConnectionMenu onConnect={this.handleConnect}/>
        </Menu>
        {this.state.tabs.map((tab, i) =>
          <Segment key={i} attached='bottom' hidden={this.state.tabIndex !== i}>
            {this.state.tabs[i]}
          </Segment>
        )}
      </div>
    );
  }
};