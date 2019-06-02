import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <Form.Group>
        <Form.Label htmlFor={this.props.name}>{this.props.label}</Form.Label>
        <Form.Control type={this.props.type}
              name={this.props.name}
              id={this.props.name}
              onChange={this.handleChange}
              value={this.state.value}
              autoComplete="off" />
      </Form.Group>
    );
  }
}
