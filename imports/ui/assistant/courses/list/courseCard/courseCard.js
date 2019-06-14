import React, { Component } from 'react';
import { List, Avatar, Icon } from "antd";

const IconText = ({type, text}) => (
  <React.Fragment>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </React.Fragment>
);

export default class CourseCard extends Component {
  render() {
    const item = this.props.item;
    return(
      item ?
        <List.Item
            key={item.title}
            actions={this.props.hasAction ? [
              <IconText type="edit" text={item.registered + '/' + item.capacity} />,
              <IconText type="form-o" text={item.reserveRegistered + '/' + item.reserveCapacity}/>
            ] : <React.Fragment />}
            extra={
              <img width={260} alt="logo"
                src="https://www.itchronicles.com/wp-content/uploads/2018/10/bigstock-Programming-Web-Banner-Best-P-258081862.jpg" />
            }
            style={{ backgroundColor: "white", padding: "24px", margin: "12px" }}>
          <List.Item.Meta avatar={
              <Avatar src='http://www.eldergrove.k12.mt.us/docs/_full_/district/basic%20images/graduation%20cap%20and%20diploma.png?id=716&thumbwidth=190&fullwidth=500'/>
            }
            title={<a href={this.props.linked ? '/assistant/courses/' + item.cid + '-' + item.group + '-' + item.credit : undefined}>{item.cid + ' - ' + item.title}</a>}
            description={item.description} />
        {item.content}
      </List.Item> :
      <React.Fragment />
    );
  }
}
