import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Breadcrumb, Row, Col, Tabs } from "antd";
import Page from "/imports/ui/assistant/_global/page/page";
import RegistrationTable from "./table/registrationTable";
import ReservationTable from "./table/reservationTable";
import Info from "./info/info";

export default class Panel extends Component {
  render() {
    return (
      <Page>
        <Row type="flex" justify="center">
          <Col span={18} lg={18} md={22} sm={24} xs={24}>
            <Breadcrumb style={{margin: "16px 0"}}>
              <Breadcrumb.Item>Courses</Breadcrumb.Item>
              <Breadcrumb.Item>CE</Breadcrumb.Item>
            </Breadcrumb>

            { this.props.match ? <Info course={this.props.match.params.id.split("-")[0]} /> : <React.Fragment /> }

            <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
              <Tabs defaultActiveKey="reg">
               <Tabs.TabPane tab="لیست ثبت نام" key="reg">
                 <RegistrationTable></RegistrationTable>
               </Tabs.TabPane>
               <Tabs.TabPane tab="لیست رزرو" key="res">
                 <ReservationTable></ReservationTable>
               </Tabs.TabPane>
              </Tabs>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}
