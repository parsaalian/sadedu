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
    console.log(Meteor.user());
    if (Meteor.user()) {
      this.props.history.push("/admin");
    }
  }

  handleLogin(username, password) {
    console.log(Meteor.user());
    this.setState({ error: "" });
    const user = this.meteorLogin(username, password);
    if (user) {
      this.props.history.push("/admin");
    }
  }

  meteorLogin(username, password) {
    console.log(Meteor.user());
    Meteor.loginWithPassword({username: username}, password, e => e ? this.setState({ error: e.reason }) : e);
    console.log(Meteor.user());
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
