import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Courses } from "/imports/api/courses/courses";
import { List, Avatar, Icon } from "antd";

const IconText = ({type, text}) => (
  <React.Fragment>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </React.Fragment>
);

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
      <List itemLayout="vertical" size="large"
          pagination={{pageSize: 4}}
          dataSource={this.filterWithCondition()}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="edit" text={item.registered + '/' + item.capacity} />,
                <IconText type="form-o" text={item.reserveRegistered + '/' + item.reserveCapacity}/>
              ]}
              extra={
                <img width={260} alt="logo"
                  src="https://www.itchronicles.com/wp-content/uploads/2018/10/bigstock-Programming-Web-Banner-Best-P-258081862.jpg" />
              }
              style={{ backgroundColor: "white", padding: "24px", margin: "12px" }}>
            <List.Item.Meta avatar={
                <Avatar src='http://www.eldergrove.k12.mt.us/docs/_full_/district/basic%20images/graduation%20cap%20and%20diploma.png?id=716&thumbwidth=190&fullwidth=500'/>
              }
              title={<a href={'/assistant/courses/' + item.cid}>{item.cid + ' - ' + item.title}</a>}
              description={item.description} />
            {item.content}
          </List.Item>
        )}
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
