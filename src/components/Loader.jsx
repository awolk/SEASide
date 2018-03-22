// @flow
import React, {Component} from 'react';
import { Loader as SpinningLoader } from 'semantic-ui-react';
import Connection from '../connection';

type Props = {
  username: string,
  password: string,
  host: string,
  onSuccess: (conn: Connection) => void,
  onFailure: (err: string) => void
};

export default class Loader extends Component<Props> {
  componentDidMount() {
    const conn = new Connection(this.props.host);

    conn.attemptLogin(this.props.username, this.props.password)
      .then(() => {
        this.props.onSuccess(conn);
      })
      .catch(err => {
        this.props.onFailure('Unsuccessful Login');
      });
  }

  render() {
    return <SpinningLoader active inline='centered'/>
  }
}
