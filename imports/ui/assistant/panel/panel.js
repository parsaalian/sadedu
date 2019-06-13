import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Breadcrumb, Row, Tabs } from "antd";
import Page from "/imports/ui/assistant/_global/page/page";
import RegistrationTable from "./table/registrationTable";
import ReservationTable from "./table/reservationTable";
import Info from './info/info';

export default class Panel extends Component {
  render() {
    return (
      <Page>
        <Breadcrumb style={{margin: "16px 0"}}>
          <Breadcrumb.Item>Courses</Breadcrumb.Item>
          <Breadcrumb.Item>CE</Breadcrumb.Item>
        </Breadcrumb>

        <Info course={this.props.match.params.id} />

        <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
          <Tabs defaultActiveKey="reg">
           <Tabs.TabPane tab="Registered" key="reg">
             <RegistrationTable></RegistrationTable>
           </Tabs.TabPane>
           <Tabs.TabPane tab="Reserved" key="res">
             <ReservationTable></ReservationTable>
           </Tabs.TabPane>
          </Tabs>
        </Row>
      </Page>
    );
  }
}
