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
  padding: .6rem;
  background-color: #F5F5F6;
`;

function TabMenuItem({onClick, active, children}) {
  const baseStyle: Object = {
    padding: '.6rem',
    paddingBottom: '.8rem',
    borderTopLeftRadius: '.2rem',
    borderTopRightRadius: '.2rem'
  };
  const activeStyle = Object.assign({backgroundColor: '#e0e0e0'}, baseStyle);
  const inactiveStyle = Object.assign({backgroundColor: 'white'}, baseStyle);
  return (
    <a
      onClick={onClick}
      style={active ? activeStyle : inactiveStyle}
    >
      {children}
    </a>
  );
}

const TabMenu = styled.div`
  margin-top: .7rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -.45rem;
`;

const Tab = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  border-radius: .6rem;
  padding: .6rem;
  margin-bottom: 1.2rem;
  text-align: center;
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
        <ConnectionMenu onConnect={this.handleConnect}/>
        <TabMenu>
          {this.state.tabs.map((tab, i) =>
            <TabMenuItem
              key={i}
              active={i === this.state.tabIndex}
              onClick={this.handleChangeTab.bind(this, i)}
            >
              {tab.props.name}
            </TabMenuItem>
          )}
        </TabMenu>
        {this.state.tabs.map((tab, i) =>
          <Tab key={i} style={{display: this.state.tabIndex === i ? 'flex' : 'none'}}>
            {this.state.tabs[i]}
          </Tab>
        )}
      </Window>
    );
  }
};