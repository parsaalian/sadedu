import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "../nav";

export default function Admin({ message, page, children }) {
  return (
    <Container fluid>
      <Row>
        <Col />
        <Col sm={7}>
          <div style={{ marginTop: "15%" }}>
            <h1 style={{ textAlign: "center", margin: "16px" }}>
              {message}
            </h1>
            {children}
          </div>
        </Col>
        <Col />
        <Nav page={page} />
      </Row>
    </Container>
  );
}
