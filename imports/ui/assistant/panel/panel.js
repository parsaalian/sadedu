import React, {Component} from "react";
import {Breadcrumb, Icon} from "antd";
import {Statistic, Card, Row, Col} from "antd";
import RegistrationTable from "./table/registrationTable";
import ReservationTable from "./table/reservationTable";
import DrawerForm from "./drawer/drawer";
import Page from "/imports/ui/assistant/_global/page/page";

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log("finished!");
}

export default class Panel extends Component {
  render() {
    return (
      <Page>
        <Breadcrumb style={{margin: "16px 0"}}>
          <Breadcrumb.Item>Courses</Breadcrumb.Item>
          <Breadcrumb.Item>CE</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
          <Col span={6}>
            <Card style={{width: 200}} title="Student Requests">
              <Statistic value={11} precision={0} valueStyle={{color: "#3f8600"}}
                         prefix={<Icon type="bell" theme="twoTone" twoToneColor="#52c41a"/>}/>
            </Card>
            <Card style={{width: 200}} title="Remaining Time">
              <Countdown value={deadline} valueStyle={{color: "#932381"}} onFinish={onFinish}
                         prefix={<Icon type="dashboard" theme="twoTone" twoToneColor="#932381"/>}/>
            </Card>
          </Col>

          <Col span={6}>
            <Card style={{width: 200}} title="Registered Students">
              <Statistic value={40} valueStyle={{color: "#179ba1"}}
                         prefix={<Icon type="edit" theme="twoTone" twoToneColor="#179ba1"/>} suffix="/ 40"/>
            </Card>
            <Card style={{width: 200}} title="Reserved Students">
              <Statistic value={9} valueStyle={{color: "#f0931b"}}
                         prefix={<Icon type="edit" theme="twoTone" twoToneColor="#f0931b"/>} suffix="/ 15"/>
            </Card>
          </Col>
          <Col span={6}>
            <DrawerForm/>
          </Col>


        </Row>

        <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
          <RegistrationTable></RegistrationTable>
        </Row>

        <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
          <ReservationTable></ReservationTable>
        </Row>
      </Page>
    );
  }
}
