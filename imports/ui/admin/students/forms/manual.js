import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Form, Button, Alert, Collapse, Col } from "react-bootstrap";
import Input from "/imports/ui/_global/input";

export default class Manual extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", success: false, open: false };
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
        <Button
          color="primary"
          style={{ marginBottom: "16px" }}
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="manual-form"
          aria-expanded={this.state.open}
        >
          Manual
        </Button>{" "}
        <Collapse in={this.state.open}>
          <div id="manual-form" style={{ marginBottom: "16px" }}>
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
              <Form.Row>
                <Col>
                  <Input
                    name="stdname"
                    type="text"
                    ref="stdname"
                    label="First Name"
                  />
                </Col>
                <Col>
                  <Input
                    name="stdfname"
                    type="text"
                    ref="stdfname"
                    label="Last Name"
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input name="stdid" type="number" ref="stdid" label="ID" />
                </Col>
                <Col>
                  <Input
                    name="stdrand"
                    type="number"
                    ref="stdrand"
                    label="Rand"
                  />
                </Col>
              </Form.Row>
            </Form>
            <Button onClick={this.submit}>Submit</Button>
          </div>
        </Collapse>
      </React.Fragment>
    );
  }
}
