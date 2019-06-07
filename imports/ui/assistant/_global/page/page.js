import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./page.css";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{minHeight: "100vh"}}>
        <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="10">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>

            <Menu.SubMenu key="sub1" title={
                <span>
                  <Icon type="book" />
                  <span>Courses</span>
                </span>
              }>
              <Menu.Item key="3">CE</Menu.Item>
              <Menu.Item key="4">General Studies</Menu.Item>
              <Menu.Item key="5">Others</Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="1">
              <Icon type="team" />
              <span>Students</span>
            </Menu.Item>

            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span>Course Chart</span>
            </Menu.Item>

            <Menu.Item key="6">
              <Icon type="notification" />
              <span>Messages</span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>

        <Layout>
          <Layout.Content style={{ margin: "0 16px" }}>
            {this.props.children}
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }}>
              SUT Registration System ©2019 Created by Our Team
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}
