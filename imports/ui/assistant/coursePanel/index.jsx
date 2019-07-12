import { Meteor } from "meteor/meteor";
import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses";
import { Breadcrumb, Row, Col } from "antd";

import convert from "/imports/ui/_global/convert";

import Page from "/imports/ui/assistant/_global/page";
import CourseCard from "/imports/ui/assistant/_global/courseCard";
import Table from "./table";
import Drawer from "./drawer";

function CoursePanel(props) {
  const { course } = props;
  return (
    <Page>
      <div
        className="fa rtl"
        style={{ marginBottom: "24px", textAlign: "right" }}
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/assistant/courses">درس‌ها</Breadcrumb.Item>
          <Breadcrumb.Item>{course ? convert(course.cid) : ""}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row type="flex" justify="center">
        <Col span={16} lg={18} md={22} sm={24} xs={24}>
          <Row type="flex" justify="center">
            <Col span={18}>
              <Table course={course} />
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          {course ? <CourseCard course={course} expand /> : <React.Fragment />}
          <Row
            className="fa"
            type="flex"
            justify="center"
            style={{ margin: "24px" }}
          >
            {course ? <Drawer course={course} /> : <React.Fragment />}
          </Row>
        </Col>
      </Row>
    </Page>
  );
}

export default withTracker((props) => {
  Meteor.subscribe("courses.admin");
  const [cid, group, credit] = props.match.params.id.split("-");
  return {
    course: Courses.find({
      cid,
      group: Number(group),
      credit: Number(credit),
    }).fetch()[0],
  };
})(CoursePanel);
