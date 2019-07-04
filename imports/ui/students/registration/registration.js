import React, {Component} from "react";
import Page from "/imports/ui/students/_global/page/page";
import Form from "/imports/ui/students/registration/form/form"
import Table from "/imports/ui/students/registration/table/table"
import {Row, Col} from "antd";

export default class Registration extends Component {
  render() {
    return (
      <Page>
        <Row type="flex" justify="center">
          <Col span={16} lg={18} md={22} sm={24} xs={24}>
            <Row type="flex" justify="center" style={{background: "#fff", padding: "24px"}}>
              <Col span={18} style={{fontFamily: "iransans", fontWeight: "600"}}>
                <Form></Form>
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{background: "#fff", padding: "24px"}}>
              <Col span={18} style={{fontFamily: "iransans", fontWeight: "600"}}>
                <Table></Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}


