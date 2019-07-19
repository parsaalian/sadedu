import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Registrations } from "/imports/api/registrations";
import { Table, Tag, Popconfirm, Form, Input, Button } from "antd";

import convert from "/imports/ui/_global/convert";

const columns = [
  {
    title: "شماره دانشجویی",
    dataIndex: "id",
    key: "id",
    render: text => <p>{text}</p>
  },
  {
    title: "وضعیت",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = "blue";
          if (tag === "gender") {
            color = "volcano";
          }
          if (tag === "عدم رعایت پیشنیازی") {
            color = "red";
          }
          if (tag === "مجاز") {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "عملیات",
    key: "action",
    render: () => (
      <Popconfirm title="آیا از حذف این دانشجو مطمئن هستید؟">
        <p>حذف</p>
      </Popconfirm>
    )
  }
];

class RegistrationTable extends Component {
  constructor(props) {
    super(props);
    this.addStudent = this.addStudent.bind(this);
  }

  addStudent() {
    const { course } = this.props;
    Meteor.call("registrations.add", {
      cid: course.cid,
      group: course.group,
      sid: this.sid.state.value
    });
  }

  render() {
    const { registrations } = this.props;
    console.log(registrations);
    return registrations ? (
      <React.Fragment>
        <Form layout="inline">
          <Form.Item>
            <Input
              type="text"
              ref={c => {
                this.sid = c;
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.addStudent}>
              اضافه‌کردن
            </Button>
          </Form.Item>
        </Form>
        <Table
          className="rtl"
          columns={columns}
          dataSource={convert(registrations.sid)}
          size="middle"
          bordered
          title={() => "لیست دانشجویان ثبت نامی"}
          footer={() => ""}
        />
      </React.Fragment>
    ) : (
      <React.Fragment />
    );
  }
}

export default withTracker(props => {
  const { course } = props;
  Meteor.subscribe("registrations.admin");
  return {
    registrations: course
      ? Registrations.find({
          cid: course.cid,
          group: course.group,
          credit: course.credit
        }).fetch()
      : null
  };
})(RegistrationTable);
