import React from "react";
import "antd/dist/antd.css";
import "./menu.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                        <Menu.Item key="10">
                            <Icon type="home" />
                            <span>Home</span>
                        </Menu.Item>

                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                  <Icon type="book" />
                  <span>Courses</span>
                </span>
                            }
                        >
                            <Menu.Item key="3">CE</Menu.Item>
                            <Menu.Item key="4">General Studies</Menu.Item>
                            <Menu.Item key="5">Others</Menu.Item>
                        </SubMenu>

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
                </Sider>
                <Layout>
                    <Header style={{ background: "#fff", padding: 0 }} />
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Courses</Breadcrumb.Item>
                            <Breadcrumb.Item>CE</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                            This is a sample page.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        SUT Registration System ©2019 Created by Our Team
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
