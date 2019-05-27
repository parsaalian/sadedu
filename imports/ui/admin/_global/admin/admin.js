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
            <div style={{marginTop: '15%'}}>
              <h1 style={{textAlign: 'center', margin: '16px'}}>{this.props.message}</h1>
              {this.props.children}
            </div>
          </Col>
          <Col></Col>
          <Nav page={this.props.page} />
        </Row>
      </Container>
    );
  }
}
