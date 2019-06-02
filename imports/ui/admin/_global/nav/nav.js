import React, { Component } from "react";
import { Grid, Row, Col, Nav } from "react-bootstrap";
import classNames from "classnames";
import "./nav.css";

export default class Navigation extends Component {
  render() {
    return(
      <Col className="navigation-col">
        <Nav color="primary" defaultActiveKey="/" className="flex-column navigation">
          <Nav.Link className={classNames({"navigation-active": this.props.page === "home"})} href="/">
            Home
          </Nav.Link>
          <Nav.Link className={classNames({"navigation-active": this.props.page === "students"})} href="/admin/students">
            Students
          </Nav.Link>
          <Nav.Link className={classNames({"navigation-active": this.props.page === "courses"})} href="/admin/courses">
            Courses
          </Nav.Link>
          <Nav.Link className={classNames({"navigation-active": this.props.page === "registrations"})} href="/admin/registrations">
            Registrations
          </Nav.Link>
        </Nav>
      </Col>
    );
  }
}
