import _ from "lodash";
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses";
import { List, Pagination } from "antd";

import CourseCard from "/imports/ui/assistant/_global/courseCard";

class CoursesList extends Component {
  filterWithCondition() {
    return _.filter(this.props.courses, item => {
      return _.reduce(
        this.props.conditions,
        (result, value, key) => {
          return (
            result &&
            (item[key] === undefined || _.startsWith(item[key], value))
          );
        },
        true
      );
    });
  }

  render() {
    return (
      <List
        grid={{ gutter: 16, column: 2 }}
        itemLayout="vertical"
        dataSource={this.filterWithCondition()}
        renderItem={course => <CourseCard course={course} />}
      />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("courses.admin");
  return {
    courses: Courses.find().fetch()
  };
})(CoursesList);
