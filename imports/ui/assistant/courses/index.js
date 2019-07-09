import React, { Component } from "react";
import _ from "lodash";
import { Layout, Row, Col } from "antd";
import Page from "/imports/ui/assistant/_global/page";
import List from "./list";
import Filter from "./filter";

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.state = { fields: { capacity: "", faculty: "", section: "", cid: "", title: "", teacher: "" } };
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(changedFields) {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  mapStateToFilter() {
    return _.reduce(this.state.fields, (result, value, key) => {
      if (value !== "") {
        result[key] = value;
      }
      return result;
    }, {});
  }

  render() {
    return (
      <Page>
        <Row>
          <Col span={18}>
            <Row type="flex" justify="center">
              <Col span={18}>
                <List conditions={this.mapStateToFilter()}></List>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Filter {...this.state.fields} onChange={this.handleFormChange} />
          </Col>
        </Row>
      </Page>
    );
  }
}
