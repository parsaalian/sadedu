import React, { Component } from "react";
import Page from "/imports/ui/students/_global/page/page";
import { Row, Col } from "antd";

export default class Registration extends Component {
  render() {
    return (
      <Page>
        <Row>
          <Col span={18}>
            <Row type="flex" justify="center">
              <Col span={18}></Col>
            </Row>
          </Col>
          <Col span={6} style={{ position: "fixed", right: "32px" }}></Col>
        </Row>
      </Page>
    );
  }
}
