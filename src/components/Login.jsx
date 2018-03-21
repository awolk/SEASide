import React, { Component } from 'react';
import { Message, Input, Form, Grid } from 'semantic-ui-react';
import { bind } from 'decko';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  @bind handleUsername(evt) {
    this.setState({username: evt.target.value})
  }

  @bind handlePassword(evt) {
    this.setState({password: evt.target.value})
  }

  @bind handleLogin(evt) {
    if (!this.state.username)
      return; // Form will highlight required username field automatically
    evt.preventDefault();
    if (this.props.attemptLogin)
      this.props.attemptLogin(this.state.username, this.state.password);
  }

  componentDidMount() {
    this.inputRef.focus();
  }

  render() {
    return (
      <Grid centered padded>
        <Form error={!!this.props.error}>
          <Message
            error
            content={this.props.error}
          />
          <Form.Field>
            <Input
              required
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleUsername}
              ref={input => this.inputRef = input}
            />
          </Form.Field>
          <Form.Input
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <Form.Button
            type='submit'
            onClick={this.handleLogin}
          >
            Login
          </Form.Button>
        </Form>
      </Grid>
    )
  }
}
