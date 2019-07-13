import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import Form from "./form";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", loading: false };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState({ loading: true });
    }
  }

  login(username, password) {
    this.setState({ error: "" });
    Meteor.loginWithPassword({ username: username }, password, e =>
      e ? this.setState({ error: e.reason }) : e
    );
    const { user } = this.props;
    if (user) {
      this.props.history.push("/" + user.roles[0]);
    }
  }

  render() {
    const { user, history } = this.props;
    const { loading, error } = this.state;
    if (user && user.roles) {
      return <Redirect to={`/${user.roles[0]}`} />;
    }
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          backgroundColor: "#F5F5F5"
        }}
      >
        {loading ? (
          <React.Fragment />
        ) : (
          <Form error={error} login={this.login} />
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    id: Meteor.userId(),
    user: Meteor.user()
  };
})(withRouter(Login));
