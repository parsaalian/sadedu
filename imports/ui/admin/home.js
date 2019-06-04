import React, { Component } from "react";
import Admin from "/imports/ui/admin/_global/admin/admin";

export default class AdminPage extends Component {
  render() {
    return (
      <Admin page="home">
        <h1>Welcome To Admin Panel</h1>
      </Admin>
    );
  }
}
