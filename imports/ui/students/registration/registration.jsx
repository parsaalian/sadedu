import React from "react";
import Page from "/imports/ui/students/_global/page/page";
import Form from "/imports/ui/students/registration/form/form";
import Table from "/imports/ui/students/registration/table/table";
import { Row, Col } from "antd";
import HelpTable from "./table/help";

export default function Registration() {
  return (
    <Page>
      <Row type="flex" justify="center">
        <Col span={16} lg={18} md={22} sm={24} xs={24}>
          <h1 className="fa rtl" style={{ textAlign: 'right' }}>ثبت نام</h1>
          <Row type="flex" justify="center" style={{ background: "#fff", padding: "24px" }}>
            <Col span={18} style={{ fontFamily: "iransans", fontWeight: "600" }}>
              <HelpTable />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ background: "#fff", padding: "24px" }}>
            <Col span={18} style={{ fontFamily: "iransans", fontWeight: "600" }}>
              <Form />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ background: "#fff", padding: "24px" }}>
            <Col span={18} style={{ fontFamily: "iransans", fontWeight: "600" }}>
              <Table />
            </Col>
          </Row>
        </Col>
      </Row>
    </Page>
  );
}
