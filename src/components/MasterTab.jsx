import React, { Component } from 'react';
import Terminal from './Terminal';
import Login from "./Login";
import Loader from './Loader';
import { bind } from 'decko';

export default class MasterTab extends Component {
  state = {
    state: 'unconnected',
    error: null
  };

  @bind attemptLogin(username, password) {
    this.setState({
      state: 'loading',
      username,
      password
    });
  }

  @bind successfulLogin(connection) {
    this.setState({
      state: 'connected',
      connection
    });
  }

  @bind failedLogin(error) {
    this.setState({
      state: 'unconnected',
      error
    });
  }

  render() {
    return (
      <div>
        {this.state.state === 'unconnected' &&
          <Login error={this.state.error} attemptLogin={this.attemptLogin}/>
        }
        {this.state.state === 'loading' &&
          <Loader username={this.state.username} password={this.state.password} host={this.props.host}
                  onSuccess={this.successfulLogin} onFailure={this.failedLogin}
          />
        }
        {this.state.state === 'connected' &&
          <Terminal connection={this.state.connection}/>
        }
      </div>
    );
  }
}
