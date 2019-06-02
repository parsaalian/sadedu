import React, { Component } from "react";
import { Form, FormGroup, Button, Alert, Collapse } from "react-bootstrap";
import Manual from "./manual";

export default class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { manual: false };
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <Button color="primary"
            onClick={() => this.setState({manual: !this.state.manual})}
            aria-controls="manual-form"
            aria-expanded={this.state.manual}>Manual</Button>{" "}
          <Button color="primary">Upload</Button>{" "}
          <Button color="primary">GET</Button>
        </FormGroup>
        <Collapse in={this.state.manual}>
          <div id="manual-form">
            <Manual />
          </div>
        </Collapse>
      </React.Fragment>
    );
  }
}
