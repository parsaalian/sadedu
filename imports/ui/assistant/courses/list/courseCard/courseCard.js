import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { List, Card, Icon, Tooltip } from "antd";
import Truncate from "react-truncate";
import convert from "/imports/ui/_global/numbers";

const style = {
  card: {
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: "1em"
  },
  smaller: {
    fontSize: "0.8em"
  }
}

class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const item = this.props.item;
    this.props.history.push("/assistant/courses/" + item.cid + "-" + item.group + "-" + item.credit);
  }

  render() {
    const item = this.props.item;
    return (item ?
      <List.Item key={item.title}>
        <Card className="fa rtl" style={style.card}
            title={<span style={style.title}>{convert(item.cid + " - " + item.title + " - گروه " + item.group)}</span>}
            actions={[
              <span><Icon className="warning" type="book"/> {convert(item.reserveRegistered + "/" + item.reserveCapacity)} <span style={style.smaller}>ثبت‌نامی</span></span>,
              <span><Icon className="success" type="book"/> {convert(item.registered + "/" + item.capacity)} <span style={style.smaller}>رزرو</span></span>
            ]}
            onClick={this.onClick}
            hoverable
            >
          <Card.Meta description={
            <div>
              <p>{item.teacher}</p>
              <p style={style.smaller}>{convert(item.time)}</p>
              <p style={style.smaller}>{convert("تاریخ امتحان: " + item.exam)}</p>
              <p style={style.smaller}>پیش‌نیاز‌ها: {item.prereq ? convert(item.prereq.join(", ")) : "-"}</p>
              {item.description ?
              <Tooltip placement="bottom"
                  title={
                    <span className="fa rtl">
                      {item.description}
                    </span>
                  }>
                <span className="error">ملاحضات</span>
              </Tooltip> : <span style={{opacity: 0}}>پرکن</span>}
            </div>
          }/>
        </Card>
      </List.Item>
    : <React.Fragment />);
  }
}

export default withRouter(CourseCard);
