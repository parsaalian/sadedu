import React from "react";
import "antd/dist/antd.css";
import "./menu.css";
import Table from "./../table/table"

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Statistic, Card, Row, Col } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
    console.log("finished!");
}

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
                        <div style={{ background: "#fff", padding: "30px" }}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card style={{ width: 200 }} title="Student Requests">
                                        <Statistic
                                            value={11}
                                            precision={0}
                                            valueStyle={{ color: "#3f8600" }}
                                            prefix={<Icon type="bell" theme="twoTone" twoToneColor="#52c41a" />}
                                        />
                                    </Card>
                                </Col>

                                <Col span={6}>
                                    <Card style={{ width: 200 }} title="Remained Time">
                                        <Countdown
                                            value={deadline}
                                            valueStyle={{ color: "#932381" }}
                                            onFinish={onFinish}
                                            prefix={
                                                <Icon type="dashboard" theme="twoTone" twoToneColor="#932381" />
                                            }
                                        />
                                    </Card>
                                </Col>

                                <Col span={6}>
                                    <Card style={{ width: 200 }} title="Registerd Students">
                                        <Statistic
                                            value={40}
                                            valueStyle={{ color: "#179ba1" }}
                                            prefix={<Icon type="edit" theme="twoTone" twoToneColor="#179ba1" />}
                                            suffix="/ 40"
                                        />
                                    </Card>
                                </Col>

                                <Col span={6}>
                                    <Card style={{ width: 200 }} title="Reseved Students">
                                        <Statistic
                                            value={9}
                                            valueStyle={{ color: "#f0931b" }}
                                            prefix={<Icon type="edit" theme="twoTone" twoToneColor="#f0931b" />}
                                            suffix="/ 15"
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Table></Table>
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
