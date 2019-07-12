import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Avatar } from "antd";

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  onClick(e) {
    const { history } = this.props;
    history.push(`/assistant${e.key}`);
  }

  logout(e) {
    this.props.logout();
  }

  render() {
    return (
      <>
        <div
          style={{
            position: "fixed",
            zIndex: "100",
            width: "100%",
            boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"
          }}
        >
          <Menu
            className="rtl"
            defaultSelectedKeys={[
              this.props.history.location.pathname.replace("/assistant", "")
            ]}
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item className="float-right">
              <img style={{ height: "54px" }} src="/images/logob.png" />
            </Menu.Item>

            <Menu.Item
              className="float-right"
              key="/courses"
              onClick={this.onClick}
            >
              <Icon
                type="book"
                style={{
                  marginRight: 0,
                  marginLeft: "10px",
                  position: "relative",
                  top: "-3px"
                }}
              />
              <span style={{ fontFamily: "IRANSans", fontWeight: "600" }}>
                درس‌ها
              </span>
            </Menu.Item>

            <Menu.Item
              className="float-right"
              key="/students"
              onClick={this.onClick}
            >
              <Icon
                type="team"
                style={{
                  marginRight: 0,
                  marginLeft: "10px",
                  position: "relative",
                  top: "-3px"
                }}
              />
              <span style={{ fontFamily: "iransans", fontWeight: "600" }}>
                دانشجویان
              </span>
            </Menu.Item>

            <Menu.Item
              className="float-right"
              key="/chart"
              onClick={this.onClick}
            >
              <Icon
                type="cluster"
                style={{
                  marginRight: 0,
                  marginLeft: "10px",
                  position: "relative",
                  top: "-3px"
                }}
              />
              <span style={{ fontFamily: "iransans", fontWeight: "600" }}>
                جدول درسی
              </span>
            </Menu.Item>

            <Menu.Item key="/notifications" onClick={this.onClick}>
              <Icon
                type="bell"
                theme="filled"
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
            </Menu.Item>

            <Menu.SubMenu
              style={{ marginLeft: "10px" }}
              title={
                <React.Fragment>
                  <Avatar size="large" style={{ backgroundColor: "#00a2ae" }}>
                    <Icon
                      style={{ margin: 0, position: "relative", top: "-3px" }}
                      type="user"
                    />
                  </Avatar>
                  <Icon
                    type="caret-down"
                    style={{ position: "relative", top: "-3px" }}
                  />
                </React.Fragment>
              }
            >
              <Menu.Item
                style={{ direction: "rtl", margin: 0 }}
                key="/setting"
                onClick={this.onClick}
              >
                <span style={{ float: "right" }}>
                  <Icon
                    type="setting"
                    style={{ marginRight: 0, marginLeft: "10px" }}
                  />
                  <span style={{ fontFamily: "iransans", fontWeight: "600" }}>
                    تنظیمات
                  </span>
                </span>
              </Menu.Item>
              <Menu.Item
                style={{ direction: "rtl", margin: 0 }}
                onClick={this.logout}
              >
                <span style={{ float: "right" }}>
                  <Icon
                    type="logout"
                    style={{ marginRight: 0, marginLeft: "10px" }}
                  />
                  <span style={{ fontFamily: "iransans", fontWeight: "600" }}>
                    خروج
                  </span>
                </span>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div style={{ lineHeight: "64px" }}>
          let this be here without reason
        </div>
      </>
    );
  }
}

export default withRouter(TopMenu);
