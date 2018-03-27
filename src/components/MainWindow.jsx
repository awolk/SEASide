// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ConnectionMenu from './ConnectionMenu';
import MasterTab from './MasterTab';
import configuration from '../SaveData';
import { servers } from '../config/servers';

const Window = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const TabMenu = styled.div`
`;
const Tab = styled.div`
  flex-grow: 1;
  background-color: lightgrey;
  border-radius: .6rem;
  margin: .6rem;
  padding: .6rem;
`;

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
      <Window>
        <TabMenu>
          {this.state.tabs.map((tab, i) =>
            <button
              key={i}
              active={i === this.state.tabIndex}
              onClick={this.handleChangeTab.bind(this, i)}
            >
              {tab.props.name}
            </button>
          )}
          <ConnectionMenu onConnect={this.handleConnect}/>
        </TabMenu>
        {this.state.tabs.map((tab, i) =>
          <Tab key={i} hidden={this.state.tabIndex !== i}>
            {this.state.tabs[i]}
          </Tab>
        )}
      </Window>
    );
  }
};