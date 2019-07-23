import { Meteor } from "meteor/meteor";
import React, { Component } from "react";

import { Row, Col, Form, InputNumber, Input, Button, Icon } from "antd";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    console.log(this.group);
    Meteor.call("registrations.add", {
      cid: this.cid.state.value,
      group: String(this.group.inputNumberRef.currentValue),
      sid: '95109529',
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="شماره گروه">
                {<InputNumber style={{ width: '100%' }} ref={(c) => { this.group = c; }} defaultValue="1" min={1} max={10} />}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="شماره درس">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "لطفا شماره درس را وارد نمایید!",
                    },
                  ],
                })(<Input style={{ width: '100%' }} ref={(c) => { this.cid = c; }} placeholder="شماره درس" maxLength={50} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              <Button type="primary" onClick={this.register}>
                <Icon type="form-o" />
                ثبت نام
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const RegisterCourse = Form.create()(RegistrationForm);
export default RegisterCourse;
