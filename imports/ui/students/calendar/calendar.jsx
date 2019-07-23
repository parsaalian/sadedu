import _ from 'lodash';
import React from "react";
import Page from "/imports/ui/students/_global/page/page";
import { Row, Col } from "antd";

import convert from '/imports/ui/_global/convert';

const data = [
  {
    name: "مدار‌های منطقی",
    class: "کلاس ۱۰۱",
    times: [
      {
        day: "شنبه",
        start: 7.5,
        end: 9,
      },
      {
        day: "دوشنبه",
        start: 7.5,
        end: 9,
      },
    ],
  },
  {
    name: "برنامه‌نویسی پیشرفته",
    class: "کلاس ۱۰۱",
    times: [
      {
        day: "شنبه",
        start: 10.5,
        end: 12,
      },
      {
        day: "دوشنبه",
        start: 10.5,
        end: 12,
      },
    ],
  },
  {
    name: "ساختمان‌های گسسته",
    class: "کلاس ۱۰۱",
    times: [
      {
        day: "یک‌شنبه",
        start: 13,
        end: 14.5,
      },
      {
        day: "سه‌شنبه",
        start: 13,
        end: 14.5,
      },
    ],
  },
];

function filterDay(day) {
  const filtered = _.reduce(data, (result, course) => {
    const { times } = course;
    const time = _.filter(times, t => t.day === day);
    if (time.length > 0) {
      result.push({
        name: course.name,
        class: course.class,
        start: time[0].start,
        end: time[0].end,
      });
      return result;
    }
    return result;
  }, []);
  return filtered;
}

function CalRow({ day }) {
  return (
    <Row style={{ height: 120 }}>
      <Col span={22} style={{ backgroundColor: 'white', height: '100%', border: '1px solid rgba(10, 10, 10, 0.5)', paddingTop: 10, paddingBottom: 10 }}>
        {
          filterDay(day).map((course, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={{
                width: (course.end - course.start) * 70.2777,
                height: 100,
                textAlign: 'center',
                position: 'absolute',
                right: (course.start - 7) * 70.2777,
                backgroundColor: 'rgba(0, 162, 174, 0.5)',
                borderRadius: 10,
                overflow: 'scroll-y',
              }}
            >
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {course.name}
                <br />
                {course.class}
              </div>
            </div>
          ))
        }
      </Col>
      <Col span={2} style={{ textAlign: 'center', marginTop: 40 }}>{day}</Col>
    </Row>
  );
}

export default function Registration() {
  return (
    <Page>
      <Row type="flex" justify="center" className="fa rtl">
        <Col style={{ width: 920 }}>
          <Row style={{ height: 50 }}>
            {_.range(7, 19).map((hour, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col span={2} key={i} className="fa rtl" style={{ float: 'right' }}>{convert(String(hour))}</Col>
            ))}
          </Row>
          <CalRow day="شنبه" />
          <CalRow day="یک‌شنبه" />
          <CalRow day="دوشنبه" />
          <CalRow day="سه‌شنبه" />
          <CalRow day="چهار‌شنبه" />
        </Col>
      </Row>
    </Page>
  );
}
