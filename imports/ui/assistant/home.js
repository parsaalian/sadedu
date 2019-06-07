import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Chart from "./chart/chart";

const boxStyle = { padding: "10px", border: "1px solid black", };

export default class AssistantPage extends Component {
  render() {
    return <Chart></Chart>
  }
}
