import _ from "lodash";
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses/courses";
import { List, Pagination } from "antd";
import CourseCard from "./courseCard/courseCard";

class CoursesList extends Component {
  filterWithCondition() {
    return _.filter(this.props.courses, (item) => {
        return _.reduce(this.props.conditions, (result, value, key) => {
          return result && (item[key] === undefined || _.startsWith(item[key].toLowerCase(), value.toLowerCase()))
      }, true)
    });
  }

  render() {
    return (
      <List grid={{gutter: 16, column: 2}} itemLayout="vertical"
        pagination={<Pagination className='fa rtl' style={{}} pageSize={8} />}
        dataSource={this.filterWithCondition()}
        renderItem={item => (<CourseCard item={item} />)} />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("courses.admin");
  return {
    courses: Courses.find().fetch()
  };
})(CoursesList);
