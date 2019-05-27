import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Courses } from '/imports/api/courses/courses';
import { Table } from 'react-bootstrap';

class CoursesTable extends Component {
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
          {this.props.courses.map((crs, i) => {
            return (
              <tr key={i}>
                <td>{crs.sid}</td>
                <td>{crs.name}</td>
                <td>{crs.familyName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('courses.admin');
  return {
    courses: Courses.find().fetch()
  }
})(CoursesTable);
