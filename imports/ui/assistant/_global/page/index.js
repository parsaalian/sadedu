import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import { Layout } from "antd";

import Forbidden from "/imports/ui/_global/403";
import Menu from "./menu";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      this.setState({ loading: true, forbidden: false });
      setTimeout(() => {
        this.checkUser();
      }, 100);
    }
  }

  checkUser() {
    if (Meteor.user()) {
      if (Meteor.user().roles[0] !== "assistant") {
        this.setState({ forbidden: true });
      } else {
        this.setState({ loading: false });
      }
    } else {
      setTimeout(() => {
        this.checkUser();
      }, 100);
    }
  }

  render() {
    const { loading, forbidden } = this.state;
    return (
      <>
        {forbidden && <Forbidden />}
        {loading && !forbidden && (
          <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
            <ClipLoader
              css={`
                margin: auto;
              `}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={loading}
            />
          </div>
        )}
        {!loading && !forbidden && (
          <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <Menu />

            <Layout.Content
              style={{ backgroundColor: "#f5f5f5", padding: "32px" }}
            >
              {this.props.children}
            </Layout.Content>

            <Layout.Footer
              style={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
            >
              <span style={{ fontFamily: "IRANSans" }}>
                © سامانه آموزش دانشگاه صنعتی شریف ۱۳۹۸
              </span>
            </Layout.Footer>
          </Layout>
        )}
      </>
    );
  }
}
