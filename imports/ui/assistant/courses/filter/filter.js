import React, { Component } from "react";
import { Form, Input, Option, Row, Col } from "antd";

export default class Filter extends Component {
  render() {
    return (
      <React.Fragment>
        <Row style={{backgroundColor: 'white', padding: '24px', borderRadius: '6px', marginBottom: '12px'}}>
          <Row style={{margin: '12px'}}>
            <h6 className='fa rtl float-right'>شماره‌ی درس</h6>
            <Input />
          </Row>
          <Row style={{margin: '12px'}}>
            <h6 className='fa rtl float-right'>نام درس</h6>
            <Input />
          </Row>
        </Row>

        <Row style={{backgroundColor: 'white', padding: '24px', borderRadius: '6px', marginBottom: '12px'}}>
          <Row style={{margin: '12px'}}>
            <h6 className='fa rtl float-right'>نام استاد</h6>
            <Input />
          </Row>
          <Row style={{margin: '12px'}}>
            <h6 className='fa rtl float-right'></h6>
            <Input />
          </Row>
        </Row>
      </React.Fragment>
    );
  }
}
