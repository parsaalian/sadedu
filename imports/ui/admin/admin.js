import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { addStudent, removeAllStudents } from '/imports/api/students';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
    this.clear = this.clear.bind(this);
  }

  test(e) {
    e.preventDefault();
    addStudent.call({sid: 95109529, name: 'parsa', familyName: 'alian', rand: 8}, (err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  clear(e) {
    e.preventDefault();
    removeAllStudents.call((err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Welcome</h1>
        <Button color='primary' onClick={this.test}>Submit</Button>
        <Button color='danger' onClick={this.clear}>Clear</Button>
      </React.Fragment>
    );
  }
}
