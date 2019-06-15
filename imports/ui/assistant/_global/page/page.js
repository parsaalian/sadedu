import React, { Component } from "react";
import { Layout } from "antd";
import Menu from './menu/menu';

export default class Page extends Component {
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Menu />

        <Layout.Content style={{ padding: "24px" }}>
          {this.props.children}
        </Layout.Content>

        <Layout.Footer style={{ textAlign: "center" }}>
            SUT Registration System ©2019 Created by Our Team
        </Layout.Footer>
      </Layout>
    );
  }
}
