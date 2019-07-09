import React, { Component } from "react";
import { Form, Button, Alert, Collapse, Col } from "react-bootstrap";
import Input from "/imports/ui/_global/input";

export default class Manual extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <React.Fragment>
        <Button
          color="primary"
          style={{ marginBottom: "16px" }}
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="api-form"
          aria-expanded={this.state.open}
        >
          API
        </Button>{" "}
        <Collapse in={this.state.open}>
          <div id="api-form" style={{ marginBottom: "16px" }}>
            <Form>
              <Input
                name="stdapilink"
                type="text"
                ref="stdapilink"
                label="Link"
              />
            </Form>
            <Button>Submit</Button>
          </div>
        </Collapse>
      </React.Fragment>
    );
  }
}
