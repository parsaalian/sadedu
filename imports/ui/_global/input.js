import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
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
      <FormGroup>
        <Label for={this.props.name}>{this.props.label}</Label>
        <Input type={this.props.type} name={this.props.name} id={this.props.name} onChange={this.handleChange} value={this.state.value} />
      </FormGroup>
    );
  }
}
