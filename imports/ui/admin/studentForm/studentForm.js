import React, { Component } from 'react';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import ManualForm from './manualForm';

export default class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { enableManual: false };
    this.switchManual = this.switchManual.bind(this);
  }

  switchManual(e) {
    e.preventDefault();
    this.setState({
      enableManual: !this.state.enableManual
    });
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <Button color='primary' onClick={this.switchManual}>Manual</Button>{' '}
          <Button color='primary'>Upload</Button>{' '}
          <Button color='primary'>GET</Button>
        </FormGroup>
        <ManualForm enable={this.state.enableManual} />
      </React.Fragment>
    );
  }
}
