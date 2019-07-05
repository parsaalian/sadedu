import React, {Component} from "react";
import {Form, Input, Row, Col, Icon, Checkbox, Select} from "antd";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    try {
      e.preventDefault();
      this.props.onChange({[e.target.name]: e.target.value});
    } catch {
      console.log(e);
    };
  }

  render() {
    return (
      <>
        <Row className="fa rtl" style={{backgroundColor: "white", padding: "24px", borderRadius: "6px", marginBottom: "12px", textAlign: "right"}}>
          <Row style={{margin: "12px"}}>
            <h6 className="float-right">فیلترها</h6>
          </Row>
          <Row style={{margin: "12px"}}>
            <Checkbox onChange={this.onChange}>فقط دروس دارای ظرفیت</Checkbox>
          </Row>
          <Row style={{margin: "12px"}}>
            <Select mode="multiple" placeholder="دانشکده" style={{width: "100%"}} onChange={this.onChange}>
              <Select.Option value="ce">مهندسی کامپیوتر</Select.Option>
              <Select.Option value="cs">علوم کامپیوتر</Select.Option>
              <Select.Option value="ee">مهندسی برق</Select.Option>
              <Select.Option value="air"> مهندسی هوافضا</Select.Option>
            </Select>
          </Row>
          <Row style={{margin: "12px"}}>
            <Select placeholder="مقطع" style={{width: "100%"}} onChange={this.onChange}>
              <Select.Option value="bsc"> کارشناسی</Select.Option>
              <Select.Option value="msc">کارشناسی ارشد</Select.Option>
              <Select.Option value="phd">دکترا</Select.Option>
            </Select>
          </Row>
        </Row>

        <Row className="fa" style={{backgroundColor: "white", padding: "24px", borderRadius: "6px", marginBottom: "12px", textAlign: "right"}}>
          <Row style={{margin: "12px"}}>
            <h6 className="float-right">مشخصات درس</h6>
            <Input.Search allowClear name="cid" placeholder="شماره درس" onChange={this.onChange} />
          </Row>
          <Row style={{margin: "12px"}}>
            <Input.Search allowClear name="title" placeholder="نام درس" onChange={this.onChange} />
          </Row>
        </Row>

        <Row className="fa rtl" style={{backgroundColor: "white", padding: "24px", borderRadius: "6px", marginBottom: "12px", textAlign: "right"}}>
          <Row style={{margin: "12px"}}>
            <h6 className="float-right">مشخصات استاد</h6>
            <Input.Search allowClear name="teacher" placeholder="نام استاد" onChange={this.onChange} />
          </Row>
        </Row>
      </>
    );
  }
}
