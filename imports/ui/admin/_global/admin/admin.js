import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from '../nav/nav';

export default class Admin extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col></Col>
          <Col sm={7}>
            {this.props.children}
          </Col>
          <Col></Col>
          <Nav page={this.props.page} />
        </Row>
      </Container>
    );
  }
}
