import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Grid} from 'semantic-ui-react';
import ConnectionMenu from './ConnectionMenu';
import Terminal from './Terminal';
import serverConfig from '../config/servers.json';

export default class MainWindow extends Component {
  state = {
    tabs: [],
    serverSelection: serverConfig.defaultServer
  };

  render() {
    return (
      <div>
        <Grid padded>
          <ConnectionMenu/>
          <Grid.Row stretched>
            <Terminal
              host='lnxsrv07.seas.ucla.edu' username='' password=''
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};