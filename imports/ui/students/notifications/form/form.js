import React, { Component } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Icon,
  InputNumber,
  Select
} from "antd";

const { Option } = Select;

export default class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    return (
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16} type="flex" justify="end">
              <Col span={6}>
                <Form.Item label="شماره درس">
                  <InputNumber
                    defaultValue={1}
                    ref="reserve"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="شماره گروه">
                  <InputNumber
                    defaultValue={1}
                    ref="capacity"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="end">
              <Col span={6}>
                <Form.Item label="شماره درس">
                  <InputNumber
                    defaultValue={1}
                    ref="reserve"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="شماره گروه">
                  <InputNumber
                    defaultValue={1}
                    ref="capacity"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="end">
              <Col>
                <Form.Item label="نوع درخواست">
                  <Select
                    placeholder="نوع درخواست"
                    style={{ width: "200px" }}
                  >
                    <Option value="ce">حذف درس</Option>
                    <Option value="cs">اخذ درس</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="end">
              <Col>
                <Form.Item label="مخاطب پیام">
                  <Select
                    mode="multiple"
                    placeholder="مخاطب پیام"
                    style={{ width: "200px" }}
                  >
                    <Option value="adviser">استاد راهنما</Option>
                    <Option value="assistant">معاون آموزشی</Option>
                    <Option value="admin">مدیر سایت</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="توضیحات">
                  <Input.TextArea
                    rows={4}
                    defaultValue={"توضیحات"}
                    ref="description"
                    placeholder="در صورت نیاز توضیحات اضافه را وارد کنید."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
    );
  }
}
