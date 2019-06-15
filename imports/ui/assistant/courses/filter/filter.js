import React, { Component } from "react";
import { Form, Input, Row, Col } from "antd";

export default CustomizedForm = Form.create({
  name: "global_state",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
    };
  }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <React.Fragment>
      <Form labelAlign="left">
        <Form.Item label="موضوع" style={{fontFamily: "iransans"}}>
          {getFieldDecorator("title", {
            rules: [{ required: false, message: "Title is required!" }],
          })(<Input />)}
        </Form.Item>
      </Form>
      <Row>
        <h4 className="fa" style={{float: "right"}}>موضوع</h4>
        <span>
          <Input />
          <Input />
        </span>
      </Row>
    </React.Fragment>
  );
});
