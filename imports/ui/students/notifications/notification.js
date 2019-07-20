import React, {Component} from "react";
import Page from "/imports/ui/students/_global/page/page";
import {Row, Col} from "antd";
import Form from "/imports/ui/students/notifications/form/form";

export default class Registration extends Component {
  render() {
    return (
      <Page>
        <Row type="flex" justify="center">
          <Col span={8} lg={18} md={22} sm={24} xs={24}>
            <Row type="flex" justify="right" style={{background: "#fff", padding: "24px"}}>
              <Col span={12} style={{fontFamily: "iransans", fontWeight: "600"}}>
              </Col>
              <Col span={12} style={{fontFamily: "iransans", fontWeight: "600"}}>
                <Form></Form>
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{background: "#fff", padding: "24px"}}>
              <Col span={18} style={{fontFamily: "iransans", fontWeight: "600"}}>

              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}


