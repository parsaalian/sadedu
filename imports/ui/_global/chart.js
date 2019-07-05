import _ from "lodash";
import React, { Component } from "react";
import d3 from "d3";
import generator from "./data";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.width = 600;
    this.height = 800;
    this.row = 8;
    this.col = 8;
    this.data = generator.generate(64);
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    var svg = d3.select("#d3").append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(30,30)");
    var node = svg.selectAll(".node").data(this.grid(this.data), (d, i) => i);
    var text = svg.selectAll(".text").data(this.grid(this.data), (d, i) => i);
    node.enter().append("circle")
        .attr("class", "node")
        .attr("id", (d, i) => i)
        .attr("r", d => 25)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("fill", "rgb(239,238,105)");

    text.enter().append("text")
        .attr("class", "text")
        .attr("id", (d, i) => i)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("dy", ".4em")
        .text(d => d.name);
  }

  grid(data) {
    return _.map(data, (d, i) => {
      var x = (i % this.col) * this.width / this.col;
      var y = _.floor(i / this.col) * this.height / this.row;
      return { name: d.name, cid: d.cid, credit: d.credit, x: x, y: y };
    });
  }

  render() {
    return <div id="d3"></div>;
  }
}
