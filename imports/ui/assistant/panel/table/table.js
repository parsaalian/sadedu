import React, { Component } from "react";
import { Tabs } from "antd";
import RegistrationTable from "./registrationTable";
import ReservationTable from "./reservationTable";

export default class Table extends Component {
  render() {
    return (
      <Tabs className='fa' defaultActiveKey="reg" style={{background: "#fff", padding: '24px'}}>
       <Tabs.TabPane tab="لیست ثبت نام" key="reg" style={{float: 'right'}}>
         <RegistrationTable></RegistrationTable>
       </Tabs.TabPane>
       <Tabs.TabPane tab="لیست رزرو" key="res">
         <ReservationTable></ReservationTable>
       </Tabs.TabPane>
      </Tabs>
    );
  }
}
