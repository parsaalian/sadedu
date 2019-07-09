import React, { Component } from "react";
import { Form, Input, Row, Col, Icon, Checkbox, Select } from "antd";

const { Option } = Select;

export default class Filter extends Component {
  render() {
    return (
      <React.Fragment>
        <Row
          className="fa rtl"
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "6px",
            marginBottom: "12px",
            textAlign: "right"
          }}
        >
          <Row style={{ margin: "12px" }}>
            <h6 className="float-right">فیلترها</h6>
          </Row>
          <Row style={{ margin: "12px" }}>
            <Checkbox>فقط دروس دارای ظرفیت</Checkbox>
          </Row>
          <Row style={{ margin: "12px" }}>
            <Select
              mode="multiple"
              placeholder="دانشکده"
              style={{ width: "200px" }}
            >
              <Option value="ce">مهندسی کامپیوتر</Option>
              <Option value="cs">علوم کامپیوتر</Option>
              <Option value="ee">مهندسی برق</Option>
              <Option value="air"> مهندسی هوافضا</Option>
            </Select>
          </Row>
          <Row style={{ margin: "12px" }}>
            <Select placeholder="مقطع" style={{ width: "200px" }}>
              <Option value="bsc"> کارشناسی</Option>
              <Option value="msc">کارشناسی ارشد</Option>
              <Option value="phd">دکتری</Option>
            </Select>
          </Row>
        </Row>

        <Row
          className="fa rtl"
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "6px",
            marginBottom: "12px",
            textAlign: "right"
          }}
        >
          <Row style={{ margin: "12px" }}>
            <h6 className="float-right">مشخصات درس</h6>
            <Input.Search
              allowClear
              placeholder="شماره درس"
              onSearch={value => console.log(value)}
            />
          </Row>
          <Row style={{ margin: "12px" }}>
            <Input.Search
              allowClear
              placeholder="نام درس"
              onSearch={value => console.log(value)}
            />
          </Row>
        </Row>

        <Row
          className="fa rtl"
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "6px",
            marginBottom: "12px",
            textAlign: "right"
          }}
        >
          <Row style={{ margin: "12px" }}>
            <h6 className="float-right">مشخصات استاد</h6>
            <Input.Search
              allowClear
              placeholder="نام استاد"
              onSearch={value => console.log(value)}
            />
          </Row>
        </Row>
      </React.Fragment>
    );
  }
}
