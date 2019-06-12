import React, { Component } from 'react';
import { Form, Input } from 'antd';

export default CustomizedForm = Form.create({
  name: 'global_state',
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
    <Form layout="inline">
      <Form.Item label="Title">
        {getFieldDecorator('title', {
          rules: [{ required: false, message: 'Title is required!' }],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
});
