import React, { Component } from "react";
import { Col } from "antd";
import { ArcherElement } from "react-archer";

const boxStyle = { padding: "10px", border: "1px solid black" };

export default class Course extends Component {
  render() {
    const relations = this.props.relations
      ? this.props.relations.map(rel => {
          return { targetId: rel, targetAnchor: "top", sourceAnchor: "bottom" };
        })
      : undefined;
    return (
      <Col span={3}>
        <ArcherElement id={this.props.id} relations={relations}>
          <div style={boxStyle}>{this.props.name}</div>
        </ArcherElement>
      </Col>
    );
  }
}
