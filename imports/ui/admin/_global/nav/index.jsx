import React from "react";
import { Col, Nav } from "react-bootstrap";
import classNames from "classnames";
import "./nav.css";

export default function Navigation({ page }) {
  return (
    <Col className="navigation-col">
      <Nav
        color="primary"
        defaultActiveKey="/"
        className="flex-column navigation"
      >
        <Nav.Link
          className={classNames({
            "navigation-active": page === "home",
          })}
          href="/"
        >
          Home
        </Nav.Link>
        <Nav.Link
          className={classNames({
            "navigation-active": page === "students",
          })}
          href="/admin/students"
        >
          Students
        </Nav.Link>
        <Nav.Link
          className={classNames({
            "navigation-active": page === "courses",
          })}
          href="/admin/courses"
        >
          Courses
        </Nav.Link>
        <Nav.Link
          className={classNames({
            "navigation-active": page === "registrations",
          })}
          href="/admin/registrations"
        >
          Registrations
        </Nav.Link>
      </Nav>
    </Col>
  );
}
