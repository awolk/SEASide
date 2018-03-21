import React, {Component} from 'react';
import { Loader as SpinningLoader } from 'semantic-ui-react';
import Connection from '../connection';

export default class Loader extends Component {
  componentDidMount() {
    const conn = new Connection(this.props.host);

    conn.attemptLogin(this.props.username, this.props.password)
      .then(() => {
        if (this.props.onSuccess)
          this.props.onSuccess(conn);
      })
      .catch(err => {
        console.error(err);
        if (this.props.onFailure)
          this.props.onFailure('Unsuccessful Login');
      });
  }

  render() {
    return <SpinningLoader active inline='centered'/>
  }
}
