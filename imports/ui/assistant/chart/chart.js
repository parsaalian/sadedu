import React, { Component } from "react";
import { Row } from "antd";
import { ArcherContainer } from "react-archer";
import Page from "/imports/ui/assistant/_global/page/page";
import Course from "./course/course";

const baseChart = [
  [
    { id: "root", name: "Root", relations: ["element3"] },
    { id: "root1", name: "Root", relations: ["element2"] },
    { id: "root2", name: "Root", relations: ["element2"] },
    { id: "root3", name: "Root", relations: ["element2"] },
    { id: "root4", name: "Root", relations: ["element2"] }
  ],
  [
    { id: "element2", name: "Element 2", relations: ["element3"] },
    { id: "element3", name: "Element 3" },
    { id: "element4", name: "Element 4" }
  ]
];

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { chart: baseChart };
  }

  render() {
    return (
      <Page>
        <ArcherContainer>
          {this.state.chart.map((semester, i) => {
            return (
              <Row
                key={i}
                type="flex"
                justify="center"
                gutter={64}
                style={{ margin: "64px" }}
              >
                {semester.map((course, j) => {
                  return (
                    <Course
                      key={j}
                      id={course.id}
                      name={course.name}
                      relations={course.relations}
                    />
                  );
                })}
              </Row>
            );
          })}
        </ArcherContainer>
      </Page>
    );
  }
}
