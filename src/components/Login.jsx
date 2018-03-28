// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  text-align: center;
  padding: 1rem;
  bottom: 0;
`;
const Message = styled.div`
  text-align: center;
`;
const Input = styled.input`
  margin: .3rem;
`;
const Button = styled.button``;

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

  handleUsername = ({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({username: currentTarget.value})
  };

  handlePassword = ({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({password: currentTarget.value})
  };

  handleLogin = (evt: SyntheticEvent<HTMLButtonElement>) => {
    if (!this.state.username)
      return; // Form will highlight required username field automatically
    evt.preventDefault();
    this.props.attemptLogin(this.state.username, this.state.password);
  };

  componentDidMount() {
    if (this.inputRef)
      this.inputRef.focus();
  }

  render() {
    return (
        <Form>
          <Message>{this.props.error}</Message><br/>
          <Input
              required
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleUsername}
              innerRef={input => this.inputRef = input}
            /><br/>
          <Input
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={this.handlePassword}
          /><br/>
          <Button
            type='submit'
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </Form>
    )
  }
}
