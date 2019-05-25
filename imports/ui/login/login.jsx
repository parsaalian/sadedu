import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      error: ''
    });
    Meteor.loginWithPassword({username: this.state.username},
      this.state.password,
      (e) => {
        this.setState({
          error: e === undefined ? '' : e.reason
        });
      });
    console.log(Meteor.user());
  }

  handleLogout(e) {
    e.preventDefault();
    Meteor.logout();
  }

  render() {
    return (
      <div>
        {this.state.error !== '' ? <Alert color="danger">{this.state.error}</Alert> : <span></span>}
        <Form>
          <FormGroup>
            <Label for='username'>Username</Label>
            <Input type='text' name='username' id='username' onChange={this.handleChange} value={this.state.username} />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input type='password' name='password' id='password' onChange={this.handleChange} value={this.state.password} />
          </FormGroup>
        </Form>
        <Button color='primary' onClick={this.handleSubmit}>Submit</Button>
        <Button color='danger' onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }
}
