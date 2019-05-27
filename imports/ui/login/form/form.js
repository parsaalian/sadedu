import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Input from '/imports/ui/_global/input';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.login(this.refs.username.state.value, this.refs.password.state.value);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.error !== '' ? <Alert color="danger">{this.props.error}</Alert> : <span></span>}
        <Form>
          <Input name='username' type='text' ref='username' label='Username' />
          <Input name='password' type='password' ref='password' label='Password' />
        </Form>
        <Button color='primary' onClick={this.login}>Login</Button>
      </React.Fragment>
    )
  }
}
