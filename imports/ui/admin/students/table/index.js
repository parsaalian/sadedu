import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Students } from "/imports/api/students/students";
import { Table, Button } from "react-bootstrap";

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove(e) {
    e.preventDefault();
    Meteor.call("students.remove", { sid: Number(e.target.name) });
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>Last Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {this.props.students.map((std, i) => {
            return (
              <tr key={i}>
                <td>{std.sid}</td>
                <td>{std.name}</td>
                <td>{std.familyName}</td>
                <td>
                  <Button name={std.sid} variant="danger" onClick={this.remove}>
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("students.admin");
  return {
    students: Students.find().fetch()
  };
})(StudentsTable);
