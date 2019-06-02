import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "./form/form";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (Meteor.user()) {
      this.props.history.push("/admin");
    }
  }

  handleLogin(username, password) {
    this.setState({ error: "" });
    const user = this.meteorLogin(username, password);
    if (user) {
      this.props.history.push("/admin");
    }
  }

  meteorLogin(username, password) {
    Meteor.loginWithPassword({username: username}, password, e => e ? this.setState({ error: e.reason }) : e);
    return Meteor.user();
  }

  render() {
    return (
      <React.Fragment>
        <Form error={this.state.error} login={this.handleLogin} />
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
