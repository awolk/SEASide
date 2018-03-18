import React, {Component} from 'react';
import {AppBar, Toolbar, Tabs, Tab, withStyles} from 'material-ui';

import ConnectionMenu from './ConnectionMenu';
import Terminal from './Terminal';

import serverConfig from '../config/servers.json';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

class MainWindow extends Component {
  state = {
    tabs: [],
    serverSelection: serverConfig.defaultServer
  };

  render() {
    const {classes} = this.props;
    return (
      <div style={{height: '100vh'}}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Tabs
              value={0}
              scrollButtons="auto"
              scrollable
              className={classes.flex}
            >
              <Tab label="Tab 1"/>
            </Tabs>
            <ConnectionMenu onConnect={server => alert(server)}/>
          </Toolbar>
        </AppBar>
        <Terminal
          host='lnxsrv07.seas.ucla.edu' username='' password=''
        />
      </div>
    );
  }
}

export default withStyles(styles)(MainWindow);