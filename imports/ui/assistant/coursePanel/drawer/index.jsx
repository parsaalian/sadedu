import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { Courses } from "/imports/api/courses";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Icon,
  InputNumber
} from "antd";

class DrawerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    this.save = this.save.bind(this);
  }

  onClose() {
    this.setState({
      visible: false,
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  save() {
    this.onClose();
    const { course } = this.props;
    if (course.capacity !== this.refs.capacity.inputNumberRef.state.value) {
      Meteor.call("courses.changeCapacity", {
        cid: course.cid,
        group: course.group,
        credit: course.credit,
        newCapacity: this.refs.capacity.inputNumberRef.state.value
      });
    }
    if (
      course.reserveCapacity !== this.refs.reserve.inputNumberRef.state.value
    ) {
      Meteor.call("courses.changeReserveCapacity", {
        cid: course.cid,
        group: course.group,
        credit: course.credit,
        newReserveCapacity: this.refs.reserve.inputNumberRef.state.value
      });
    }
    if (course.teacher !== this.refs.teacher.state.value) {
      Meteor.call("courses.changeTeacher", {
        cid: course.cid,
        group: course.group,
        credit: course.credit,
        newTeacher: this.refs.teacher.state.value
      });
    }
    console.log(this.refs.description);
  }

  render() {
    const { course } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="edit" /> تغییر اطلاعات
        </Button>
        <Drawer
          className="fa"
          title="اطلاعات درس"
          width={540}
          onClose={this.onClose}
          visible={this.state.visible}
          placement="left"
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16} type="flex" justify="end">
              <Col span={6}>
                <Form.Item label="ظرفیت رزرو">
                  <InputNumber
                    defaultValue={course.reserveCapacity}
                    ref="reserve"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="ظرفیت">
                  <InputNumber
                    defaultValue={course.capacity}
                    ref="capacity"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="end">
              <Col>
                <Form.Item label="استاد">
                  <Input defaultValue={course.teacher} ref="teacher" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="end">
              <Col>
                <Form.Item label="محل کلاس">
                  <Input defaultValue={course.place} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="ملاحظات">
                  <Input.TextArea
                    rows={4}
                    defaultValue={course.description}
                    ref="description"
                    placeholder="در صورت نیاز ملاحظات را وارد کنید."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              لغو
            </Button>
            <Button onClick={this.save} type="primary">
              ذخیره
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("courses");
  return {
    courses: Courses.find({}).fetch()
  };
})(DrawerForm);
