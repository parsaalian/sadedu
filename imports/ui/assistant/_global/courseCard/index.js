import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { List, Card, Icon, Tooltip } from "antd";
import JDate from "jalali-date";
import convert from "/imports/ui/_global/convert";

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
};

class CourseCard extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.history.push(
      "/assistant/courses/" +
        this.props.course.cid +
        "-" +
        this.props.course.group +
        "-" +
        this.props.course.credit
    );
  };

  render() {
    const { course } = this.props;
    return course ? (
      <List.Item key={course.title}>
        <Card
          className="fa rtl"
          style={style.card}
          title={
            <span style={style.title}>
              {convert(
                course.cid + " - " + course.title + " - گروه " + course.group
              )}
            </span>
          }
          actions={[
            <span>
              <Icon className="primary" type="info-circle" />{" "}
              {convert(String(course.credit))}{" "}
              <span style={style.smaller}>واحد</span>
            </span>,
            <span>
              <Icon className="warning" type="book" />{" "}
              {convert(course.reserveRegistered + "/" + course.reserveCapacity)}{" "}
              <span style={style.smaller}>رزرو</span>
            </span>,
            <span>
              <Icon className="success" type="book" />{" "}
              {convert(course.registered + "/" + course.capacity)}{" "}
              <span style={style.smaller}>ثبت‌نامی</span>
            </span>
          ]}
          onClick={this.onClick}
          hoverable
        >
          <Card.Meta
            description={
              <div>
                <p>{course.teacher}</p>
                <p style={style.smaller}>{convert(course.time)}</p>
                <p style={style.smaller}>
                  {convert(
                    `تاریخ امتحان: ${new JDate(course.exam).date.join(
                      "/"
                    )} ساعت ${course.exam.getHours()}:${(
                      "0" + course.exam.getMinutes()
                    ).slice(-2)}`
                  )}
                </p>
                <p style={style.smaller}>
                  پیش‌نیاز‌ها:{" "}
                  {course.prereq ? convert(course.prereq.join(", ")) : "-"}
                </p>
                {this.props.expand ? (
                  <>
                    <p style={style.smaller}>
                      مقطع{" "}
                      {
                        { bsc: "کارشناسی", ms: "کارشناسی ارشد", phd: "دکتری" }[
                          course.section
                        ]
                      }{" "}
                      دانشکده‌ی {course.faculty}
                    </p>
                    <span className="error">{course.description}</span>
                  </>
                ) : course.description ? (
                  <Tooltip
                    placement="bottom"
                    title={<span className="fa rtl">{course.description}</span>}
                  >
                    <span className="error">ملاحضات</span>
                  </Tooltip>
                ) : (
                  <span style={{ opacity: 0 }}>پرکن</span>
                )}
              </div>
            }
          />
        </Card>
      </List.Item>
    ) : (
      <></>
    );
  }
}

export default withRouter(CourseCard);
