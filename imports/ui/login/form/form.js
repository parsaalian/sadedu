import React, {Component} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {LinkedInLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import Input from "/imports/ui/_global/input";
import './login.css'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();
        this.props.login(this.refs.username.state.value, this.refs.password.state.value);
    }

    render() {
        return (
            <form className="demoForm">
                <h4>ورود با حساب کاربری</h4>
                <div className="form-group">
                    <Input type="text" name="username" label="نام کاربری" className="form-control" ref="username" align="center" placeholder="نام کاربری" />
                    {/*<label htmlFor="username">نام کاربری</label>
                    <input type="username" required className="form-control" name="username"
                           placeholder="نام کاربری" align={"center"} ref='username'/>*/}
                </div>
                <div className="form-group">
                <Input type="password" name="password" label="کلمه عبور" className="form-control" ref="password" align="center" placeholder="کلمه عبور" />
                    {/*<label htmlFor="password">کلمه عبور</label>
                    <input type="password" className="form-control" name="password"
                           placeholder="کلمه عبور" ref='password'/>*/}
                </div>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="مرا به خاطر بسپار"/>
                </Form.Group>
                <button type="submit" className="btn btn-info" onClick={this.login}>ورود</button>
                <div>
                    <a href='#'>بازیابی کلمه عبور</a>
                </div>

                <h4>ورود با حساب اجتماعی</h4>
                <GoogleLoginButton size="50px" onClick={() => alert("Hello")}>
                    <span>ورود با حساب گوگل</span>
                </GoogleLoginButton>
                <LinkedInLoginButton onClick={() => alert("Hello")}/>

            </form>
        );
    }
}
