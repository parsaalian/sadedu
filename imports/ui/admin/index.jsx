/* eslint class-methods-use-this: off */
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Admin from "/imports/ui/admin/_global/admin/admin";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    Meteor.logout();
  }

  render() {
    return (
      <Admin page="home">
        <h1>Welcome To Admin Panel</h1>
        <button onClick={this.onClick} type="button">logout</button>
      </Admin>
    );
  }
}
