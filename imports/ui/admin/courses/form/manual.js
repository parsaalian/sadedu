import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Input from "/imports/ui/_global/input";

export default class ManualForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", success: false };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.setState({
      error: "",
      success: false
    });
    Meteor.call(
      "students.add",
      {
        sid: Number(this.refs.stdid.state.value),
        name: this.refs.stdname.state.value,
        familyName: this.refs.stdfname.state.value,
        rand: Number(this.refs.stdrand.state.value)
      },
      (err, res) => {
        if (err) {
          this.setState({
            error: err.error
          });
        } else {
          this.setState({
            success: true
          });
        }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.success ? (
          <Alert color="success">Student added.</Alert>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {this.state.error !== "" ? (
          <Alert color="danger">{this.state.error}</Alert>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Form>
          <Input name="stdid" type="number" ref="stdid" label="Student ID" />
          <Input
            name="stdname"
            type="text"
            ref="stdname"
            label="Student Name"
          />
          <Input
            name="stdfname"
            type="text"
            ref="stdfname"
            label="Student Family Name"
          />
          <Input
            name="stdrand"
            type="number"
            ref="stdrand"
            label="Student Rand"
          />
        </Form>
        <Button onClick={this.submit}>Submit</Button>
      </React.Fragment>
    );
  }
}
