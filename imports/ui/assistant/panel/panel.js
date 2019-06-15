import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Breadcrumb, Row, Col, Tabs } from "antd";
import Page from "/imports/ui/assistant/_global/page/page";
import Table from "./table/table";
import Info from "./info/info";

export default class Panel extends Component {
  render() {
    return (
      <Page>
        <div className="fa rtl" style={{ marginBottom: "24px", textAlign: "right" }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/assistant/courses">درس‌ها</Breadcrumb.Item>
            <Breadcrumb.Item>{this.props.match ? this.props.match.params.id.split("-")[0] : ""}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Row type="flex" justify="center">
          <Col span={16} lg={18} md={22} sm={24} xs={24}>
            <Row type="flex" justify="center">
              <Col span={18}>
                <Table />
              </Col>
            </Row>
          </Col>

          <Col span={6}>
            { this.props.match ? <Info course={this.props.match.params.id.split("-")[0]} /> : <React.Fragment /> }
          </Col>
        </Row>
      </Page>
    );
  }
}
