import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

import Form from "./form/form";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", loading: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (Meteor.userId()) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.getUser();
      }, 1000);
    }
  }

  getUser() {
    if (Meteor.user()) {
      switch (Meteor.user().roles[0]) {
        case "admin":
          this.props.history.push("/admin");
          break;
        case "assistant":
          this.props.history.push("/assistant");
          break;
        case "student":
          this.props.history.push("/student");
          break;
        default:
          this.setState({ loading: false });
          this.props.history.push("/");
      }
    } else {
      setTimeout(() => {
        this.getUser();
      }, 1000);
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
    Meteor.loginWithPassword({ username: username }, password, e =>
      e ? this.setState({ error: e.reason }) : e
    );
    return Meteor.user();
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
            <ClipLoader
              css={`
                margin: auto;
              `}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <Form error={this.state.error} login={this.handleLogin} />
        )}
      </>
    );
  }
}

export default withRouter(Login);
