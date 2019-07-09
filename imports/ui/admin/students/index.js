import React, { Component } from "react";
import Admin from "/imports/ui/admin/_global/admin/admin";

import Form from "/imports/ui/admin/_global/form/form";
import Manual from "./forms/manual";
import API from "./forms/api";
import Table from "./table";

export default class StudentsPage extends Component {
  render() {
    return (
      <Admin page="students" message="Modify Students List">
        <Form forms={[Manual, API]} />
        <Table />
      </Admin>
    );
  }
}
