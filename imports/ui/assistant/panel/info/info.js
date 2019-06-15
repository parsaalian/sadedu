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
        <React.Fragment>
          <Row type="flex" justify="center">
            <Card className='fa rtl' title={course.title} style={{background: "#fff", textAlign: 'center', width: '100%'}}>
              <h6>گروه {course.group} - {course.credit} واحدی</h6>
              <h6>استاد درس: {course.teacher}</h6>
              {course.description}
            </Card>
          </Row>

          <Row type="flex" justify="center">
            <Card className='fa rtl' title='ثبت‌نام' style={{background: "#fff", textAlign: 'center', width: '100%'}}>
              <Card.Grid style={{width: '50%'}}>
                <h6 >رزرو</h6>
                {course.reserveRegistered} از {course.reserveCapacity}
              </Card.Grid>
              <Card.Grid style={{width: '50%'}}>
                <h6 >عادی</h6>
                {course.registered} از {course.capacity}
              </Card.Grid>
            </Card>
          </Row>

          <Row type="flex" justify="center">
            <Card className='fa rtl' title='زمان' style={{background: "#fff", textAlign: 'center', width: '100%'}}>
              <Card.Grid style={{width: '50%'}}>
                <h6 >برنامه‌ی هفتگی</h6>
                {course.time}
              </Card.Grid>
              <Card.Grid style={{width: '50%'}}>
                <h6 >امتحان</h6>
                {String(course.exam)}
              </Card.Grid>
            </Card>
          </Row>
        </React.Fragment> :
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
