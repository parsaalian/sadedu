import React, {Component} from "react";

import {Row, Col, Form, InputNumber, Input, Button, Icon} from "antd";

class RegistrationForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <React.Fragment>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="شماره درس">
                {getFieldDecorator("name", {
                  rules: [{required: true, message: "لطفا شماره درس را وارد نمایید!"}],
                })(<Input placeholder="شماره درس" maxLength={50}/>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="شماره گروه">
                {(<InputNumber defaultValue="1" min={1} max={10}/>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="تعداد واحد">
                {(<InputNumber defaultValue="3" min={0} max={4}/>)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} >
            <Col span={4} >
              <Button type="primary">
                <Icon type="form-o"/>ثبت نام
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


