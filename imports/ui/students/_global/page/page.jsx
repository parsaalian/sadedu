import { Meteor } from "meteor/meteor";
import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Layout } from "antd";

import Forbidden from "/imports/ui/_global/403";
import Menu from "./menu/menu";

function Page(props) {
  const { user, id, children, logout } = props;
  if (user && user.roles) {
    if (user.roles[0] !== "student") {
      return <Forbidden />;
    }
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Menu logout={logout} />

        <Layout.Content style={{ backgroundColor: "#f5f5f5", padding: "32px" }}>
          {children}
        </Layout.Content>

        <Layout.Footer
          style={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
        >
          <span style={{ fontFamily: "IRANSans" }}>
            © سامانه آموزش دانشگاه صنعتی شریف ۱۳۹۸
          </span>
        </Layout.Footer>
      </Layout>
    );
  }
  if (id) {
    return <React.Fragment />;
  }
  return <Redirect to="/" />;
}

export default withTracker(() => ({
  id: Meteor.userId(),
  user: Meteor.user(),
  logout: Meteor.logout,
}))(withRouter(Page));
