import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "./page.css";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.onCollapse = this.onCollapse.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  onClick(e) {
    console.log(this.props.history);
    this.props.history.push('/assistant' + e.key);
  }

  render() {
    return (
      <Layout style={{minHeight: "100vh"}}>
        <div style={{position: 'fixed', zIndex: '100', width: '100%'}}>
          <Menu theme="dark" defaultSelectedKeys={[this.props.history.location.pathname.replace('/assistant', '')]} mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="/" onClick={this.onClick} disabled={true}>
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>

            <Menu.Item key="/courses" onClick={this.onClick}>
              <Icon type="home" />
              <span>Courses</span>
            </Menu.Item>

            <Menu.Item key="/students" onClick={this.onClick}>
              <Icon type="team" />
              <span>Students</span>
            </Menu.Item>

            <Menu.Item key="/chart" onClick={this.onClick}>
              <Icon type="pie-chart" />
              <span>Course Chart</span>
            </Menu.Item>

            <Menu.Item key="/messages" onClick={this.onClick} disabled={true}>
              <Icon type="notification" />
              <span>Messages</span>
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ lineHeight: '64px' }}>let this be here without reason</div>

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

export default withRouter(Page);
