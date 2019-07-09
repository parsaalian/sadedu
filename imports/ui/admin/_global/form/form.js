import React, { Component } from "react";
import { FormGroup, Container, Row } from "react-bootstrap";

export default class Form extends Component {
  render() {
    return (
      <FormGroup>
        {this.props.forms ? (
          this.props.forms.map((TheForm, i) => <TheForm key={i} />)
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </FormGroup>
    );
  }
}
