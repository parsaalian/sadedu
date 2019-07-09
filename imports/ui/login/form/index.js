import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.login(
      this.refs.username.state.value,
      this.refs.password.state.value
    );
  }

  render() {
    return (
      <div className="fa rtl" style={{ margin: "auto" }}>
        <Form onSubmit={this.login}>
          <div
            style={{
              padding: "2rem",
              boxShadow: "0px 0px 7px -2px rgba(17,17,17,0.5)",
              borderRadius: "1rem"
            }}
          >
            <h1>ورود به سامانه</h1>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="نام کاربری"
                ref="username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="رمز عبور"
                ref="password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ float: "left" }}
                type="primary"
                htmlType="submit"
              >
                ورود
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
