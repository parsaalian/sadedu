import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '/imports/api/students/students';
import { Table } from 'reactstrap';
import StudentForm from './studentForm/studentForm';

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Welcome</h1>
        <StudentForm />
        <Table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.students.map((std, i) => {
              return (
                <tr key={i}>
                  <td>{std.sid}</td>
                  <td>{std.name}</td>
                  <td>{std.familyName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students.admin');
  return {
    students: Students.find().fetch()
  }
})(Admin);
