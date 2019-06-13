import { Meteor } from 'meteor/meteor';
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses/courses";
import { Icon, Statistic, Card, Row, Col } from "antd";
import DrawerForm from "../drawer/drawer";

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const getAttr = (prop, attr, def) => {
  return prop ? prop[attr] : def;
};

class Info extends Component {
  render() {
    const course = this.props.course;
    return(
      <Row gutter={16} style={{background: "#fff", padding: "30px"}}>
        <Col span={6}>
          <Card style={{width: 200}} title="Student Requests">
            <Statistic value={11} precision={0} valueStyle={{color: "#3f8600"}} prefix={<Icon type="bell" theme="twoTone" twoToneColor="#52c41a"/>}/>
          </Card>

          <Card style={{width: 200}} title="Remaining Time">
            <Countdown value={deadline} valueStyle={{color: "#932381"}} prefix={<Icon type="dashboard" theme="twoTone" twoToneColor="#932381"/>}/>
          </Card>
        </Col>

        <Col span={6}>
          <Card style={{width: 200}} title="Registered Students">
            <Statistic value={getAttr(course, 'registered', 0)} valueStyle={{color: "#179ba1"}} prefix={<Icon type="edit" theme="twoTone" twoToneColor="#179ba1"/>} suffix={"/" + getAttr(course, 'capacity', 0)} />
          </Card>
          <Card style={{width: 200}} title="Reserved Students">
            <Statistic value={getAttr(course, 'reserveRegistered', 0)} valueStyle={{color: "#f0931b"}} prefix={<Icon type="edit" theme="twoTone" twoToneColor="#f0931b"/>} suffix={"/" + getAttr(course, 'reserveCapacity', 0)} />
          </Card>
        </Col>

        <Col span={6}>
          <DrawerForm/>
        </Col>
      </Row>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe("courses.admin");
  return {
    course: Courses.find({cid: props.course}).fetch()[0]
  }
})(Info);
