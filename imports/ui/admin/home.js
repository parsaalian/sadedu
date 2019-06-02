import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Admin from "/imports/ui/admin/_global/admin/admin";

export default class StudentsPage extends Component {
  render() {
    return (
      <Admin page="home">
        <h1>Welcome To Admin Panel</h1>
      </Admin>
    );
  }
}
