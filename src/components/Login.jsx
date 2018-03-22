// @flow
import React, { Component } from 'react';
import { Message, Input, Form, Grid } from 'semantic-ui-react';
import { bind } from 'decko';

type Props = {
  error: ?string,
  attemptLogin: (username: string, password: string) => void
};

type State = {
  username: string,
  password: string
};

export default class Login extends Component<Props, State> {
  state = {
    username: '',
    password: ''
  };

  inputRef: ?HTMLInputElement;

  @bind handleUsername({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({username: currentTarget.value})
  }

  @bind handlePassword({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({password: currentTarget.value})
  }

  @bind handleLogin(evt: SyntheticEvent<HTMLButtonElement>) {
    if (!this.state.username)
      return; // Form will highlight required username field automatically
    evt.preventDefault();
    this.props.attemptLogin(this.state.username, this.state.password);
  }

  componentDidMount() {
    if (this.inputRef)
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
