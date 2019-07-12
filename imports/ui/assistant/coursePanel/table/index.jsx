import React from "react";
import { Tabs } from "antd";
import RegistrationTable from "./registrationTable";
import ReservationTable from "./reservationTable";

export default function Table(props) {
  const { course } = props;
  return (
    <Tabs
      className="fa"
      defaultActiveKey="reg"
      style={{ background: "#fff", padding: "24px" }}
    >
      <Tabs.TabPane tab="لیست ثبت نام" key="reg" style={{ float: "right" }}>
        <RegistrationTable course={course} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="لیست رزرو" key="res">
        <ReservationTable course={course} />
      </Tabs.TabPane>
    </Tabs>
  );
}
