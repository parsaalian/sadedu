import React, {Component} from "react";
import _ from 'lodash';
import { List, Avatar, Icon } from "antd";

const listData = [];
for (let i = 1; i < 10; i++) {
  listData.push({
    href: `/assistant/courses/4040${i}`,
    title: `4040${i} - Advanced Programming`,
    avatar: 'http://www.eldergrove.k12.mt.us/docs/_full_/district/basic%20images/graduation%20cap%20and%20diploma.png?id=716&thumbwidth=190&fullwidth=500',
    description:
      'Group: 2 - Instructor: Alireza Mazloumi',
    content:
      'This course extends the study of basic programming principles introduced in Fundamentals of Programming. Advanced concepts of program design, implementation and testing will be introduced within a framework of object oriented programming using the Java or C++ programming language.',
  });
}

const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: listData };
  }

  filterWithCondition() {
    return _.filter(this.state.list, (item) => {
        return _.reduce(this.props.conditions, (result, value, key) => {
          return result && (item[key] === undefined || _.startsWith(item[key], value))
      }, true)
    });
  }

  render() {
    return (
      <List itemLayout="vertical" size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={this.filterWithCondition()}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="edit" text="70/70"/>,
                <IconText type="form-o" text="5/15"/>
              ]}
              extra={
                <img
                  width={260}
                  alt="logo"
                  src="https://www.itchronicles.com/wp-content/uploads/2018/10/bigstock-Programming-Web-Banner-Best-P-258081862.jpg"
                />
              }
              style={{ backgroundColor: "white", padding: "24px", margin: "12px" }}>
            <List.Item.Meta avatar={<Avatar src={item.avatar}/>} title={<a href={item.href}>{item.title}</a>} description={item.description} />
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}
