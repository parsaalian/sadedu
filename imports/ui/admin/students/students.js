import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Admin from '/imports/ui/admin/_global/admin/admin';

import Form from './form/form';
import Table from './table/table';

export default class StudentsPage extends Component {
  render() {
    return (
      <Admin page='students'>
        <Form />
        <Table />
      </Admin>
    );
  }
}
