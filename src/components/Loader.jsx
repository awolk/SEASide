// @flow
import React, {Component} from 'react';
import { Loader as SpinningLoader } from 'semantic-ui-react';
import Connection from '../Connection';

type Props = {
  method: 'password' | 'key',
  username: string,
  password?: string,
  host: string,
  onSuccess: (conn: Connection) => void,
  onFailure: (err?: string) => void
};

export default class Loader extends Component<Props> {
  componentDidMount() {
    const conn = new Connection(this.props.host);
    if (this.props.method === 'password')
      conn.attemptLogin(this.props.username, this.props.password)
        .then(() => {
          this.props.onSuccess(conn);
        })
        .catch(err => {
          this.props.onFailure('Unsuccessful Login');
        });
    else
      conn.attemptKeyLogin(this.props.username)
        .then(() => {
          this.props.onSuccess(conn);
        })
        .catch(err => {
          console.error(err);
          this.props.onFailure();
        });
  }

  render() {
    return <SpinningLoader active inline='centered'/>
  }
}
