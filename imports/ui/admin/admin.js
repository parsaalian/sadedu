import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import StudentForm from './studentForm/studentForm';

export default class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Welcome</h1>
        <StudentForm />
      </React.Fragment>
    );
  }
}
