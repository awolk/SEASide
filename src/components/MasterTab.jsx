// @flow
import React, { Component } from 'react';
import Terminal from './Terminal';
import Login from "./Login";
import Loader from './Loader';
import Connection from "../Connection";
import configuration from "../SaveData";

type Props = {
  host: string,
  name: string,
  username?: string
};

type State = {
  state: 'unconnected' | 'loading-key' | 'loading-password' | 'connected',
  username?: string,
  password?: string,
  connection?: Connection,
  error?: string
};

export default class MasterTab extends Component<Props, State> {
  state = {
    state: 'unconnected'
  };

  componentDidMount() {
    if (this.props.username != null)
      this.setState({
        state: 'loading-key',
        username: this.props.username
      });
    else
      this.setState({
        state: 'unconnected'
      })
  }

  attemptLogin = (username: string, password: string) => {
    this.setState({
      state: 'loading-password',
      username,
      password
    });
  };

  successfulLogin = (connection: Connection) => {
    configuration.username = this.state.username || ''; // Save default username
    this.setState({
      state: 'connected',
      connection
    });
  };

  failedLogin = (error?: string) => {
    this.setState({
      state: 'unconnected',
      error
    });
  };

  render() {
    return (
      <div>
        {this.state.state === 'unconnected' &&
          <Login error={this.state.error || ''} attemptLogin={this.attemptLogin}/>
        }
        {this.state.state === 'loading-key' &&
          <Loader method='key'
                  username={this.state.username || ''} host={this.props.host}
                  onSuccess={this.successfulLogin} onFailure={this.failedLogin}
          />
        }
        {this.state.state === 'loading-password' &&
        <Loader method='password'
                username={this.state.username || ''} password={this.state.password || ''} host={this.props.host}
                onSuccess={this.successfulLogin} onFailure={this.failedLogin}
        />
        }
        {this.state.state === 'connected' && this.state.connection &&
        <Terminal connection={this.state.connection}/>
        }
      </div>
    );
  }
}
