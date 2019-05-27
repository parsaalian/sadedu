import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Students } from '/imports/api/students/students';
import { Table } from 'react-bootstrap';

class StudentsTable extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
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
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students.admin');
  return {
    students: Students.find().fetch()
  }
})(StudentsTable);
