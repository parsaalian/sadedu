import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses/courses";
import { List } from "antd";
import CourseCard from './courseCard/courseCard';

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
      <List itemLayout="vertical" size="large" pagination={{pageSize: 4}} dataSource={this.filterWithCondition()}
        renderItem={item => (<CourseCard item={item} hasAction={true} linked={true} />)} />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("courses.admin");
  return {
    courses: Courses.find().fetch()
  };
})(CoursesList);
