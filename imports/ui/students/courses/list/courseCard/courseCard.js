import React, { Component } from "react";
import { List, Card, Icon } from "antd";
import Truncate from "react-truncate";

const IconText = ({ type, text }) => (
  <React.Fragment>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </React.Fragment>
);

export default class CourseCard extends Component {
  render() {
    const item = this.props.item;
    return item ? (
      <List.Item key={item.title}>
        <Card
          className="fa rtl"
          style={{ textAlign: "center" }}
          title={item.cid + " - " + item.title + " - گروه " + item.group}
          extra={
            <a
              href={
                "/assistant/courses/" +
                item.cid +
                "-" +
                item.group +
                "-" +
                item.credit
              }
            >
              بیشتر
            </a>
          }
        >
          <Card.Grid>
            {"ثبت‌نام " + item.registered + "/" + item.capacity}
          </Card.Grid>
          <Card.Grid>
            {"رزرو " + item.reserveRegistered + "/" + item.reserveCapacity}
          </Card.Grid>
          <Card.Grid>{"استاد " + item.teacher}</Card.Grid>
          <Card.Grid>{"زمان " + item.time}</Card.Grid>
          <Card.Grid>{item.faculty}</Card.Grid>
          <Card.Grid>{"مقطع " + item.section}</Card.Grid>
        </Card>
      </List.Item>
    ) : (
      <React.Fragment />
    );
  }
}
