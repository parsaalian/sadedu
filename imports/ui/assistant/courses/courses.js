import React, { Component } from "react";
import _ from 'lodash';
import { Row, Col } from "antd";
import Page from "/imports/ui/assistant/_global/page/page";
import List from "./list/list";
import Filter from "./filter/filter";

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.state = { fields: { title: { value: '' } } };
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(changedFields) {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  mapStateToFilter() {
    return _.reduce(this.state.fields, (result, value, key) => {
      if (value.value !== '') {
        result[key] = value.value;
      }
      return result;
    }, {});
  }

  render() {
    return (
      <Page>
        <Row type="flex" justify="center">
          <Col span={12}>
            <Filter {...this.state.fields} onChange={this.handleFormChange} />
            <List conditions={this.mapStateToFilter()}></List>
          </Col>
        </Row>
      </Page>
    );
  }
}
