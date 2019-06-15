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
      <Layout style={{minHeight: '100vh'}}>
        <div style={{position: 'fixed', zIndex: '100', width: '100%'}}>
          <Menu className="rtl" theme="dark" defaultSelectedKeys={[this.props.history.location.pathname.replace('/assistant', '')]} mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="float-right" key="/" onClick={this.onClick} disabled={true}>
              <Icon type="home" />
              <span>خانه</span>
            </Menu.Item>

            <Menu.Item className="float-right" key="/courses" onClick={this.onClick}>
              <Icon type="home" style={{ marginRight: 0, marginLeft: '10px', position: 'relative', top: '-3px' }} />
              <span style={{fontFamily: 'IRANSans'}}>درس‌ها</span>
            </Menu.Item>

            <Menu.Item className="float-right" key="/students" onClick={this.onClick}>
              <Icon type="team" style={{ marginRight: 0, marginLeft: '10px', position: 'relative', top: '-3px' }} />
              <span>دانشجویان</span>
            </Menu.Item>

            <Menu.Item className="float-right" key="/chart" onClick={this.onClick}>
              <Icon type="pie-chart" style={{ marginRight: 0, marginLeft: '10px', position: 'relative', top: '-3px' }} />
              <span>جدول درسی</span>
            </Menu.Item>

            <Menu.Item className="float-right" key="/messages" onClick={this.onClick} disabled={true}>
              <Icon type="notification" style={{ marginRight: 0, marginLeft: '10px', position: 'relative', top: '-3px' }} />
              <span>پیام‌ها</span>
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
