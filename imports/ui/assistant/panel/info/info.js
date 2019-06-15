import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses/courses";
import { Icon, Statistic, Card, Row, Col } from "antd";
import DrawerForm from "../drawer/drawer";

class Info extends Component {
  render() {
    const course = this.props.course;
    return (
      course ?
        <Row type="flex" justify="center" gutter={16} style={{background: "#fff", padding: "30px"}}>
          <Col span={9}>
            <Card title={course.title}>
              <h6>Group {course.group} - Credit {course.credit}</h6>
              <h6>Instructor: {course.teacher}</h6>
              {course.description}
            </Card>
          </Col>

          <Col span={12}>
            <Row type="flex" justify="center">
              <Col>
                <Card style={{width: 250}} title="درخواست های دانشجویان">
                  <Statistic value={11} precision={0} valueStyle={{color: "#3f8600"}} prefix={<Icon type="bell" theme="twoTone" twoToneColor="#52c41a"/>}/>
                </Card>

                <Card style={{width: 250}} title="زمان باقی مانده تا ثبت نام">
                  <Statistic.Countdown value={Date.now() + 172830000} valueStyle={{color: "#932381"}} prefix={<Icon type="dashboard" theme="twoTone" twoToneColor="#932381"/>}/>
                </Card>
              </Col>

              <Col>
                <Card style={{width: 250}} title="تعداد دانشجویان ثبت نامی">
                  <Statistic value={course.registered} valueStyle={{color: "#179ba1"}} prefix={<Icon type="edit" theme="twoTone" twoToneColor="#179ba1"/>} suffix={"/" + course.capacity} />
                </Card>
                <Card style={{width: 250}} title="تعداد دانشجویان رزرو">
                  <Statistic value={course.reserveRegistered} valueStyle={{color: "#f0931b"}} prefix={<Icon type="edit" theme="twoTone" twoToneColor="#f0931b"/>} suffix={"/" + course.reserveCapacity} />
                </Card>
              </Col>
            </Row>

            <Row type="flex" justify="center" style={{margin: "16px"}}>
              <DrawerForm/>
            </Row>
          </Col>
        </Row> :
        <React.Fragment />
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe("courses.admin");
  return {
    course: Courses.find({cid: props.course}).fetch()[0]
  }
})(Info);
