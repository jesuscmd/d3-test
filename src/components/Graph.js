import React, { useRef } from "react";
import { useEffectOnce } from "react-use";

import nodeData from "./GraphData";
import * as d3 from "d3v4";

const Graph = ({ onClickPath = () => {} }) => {
  const ref = useRef();

  useEffectOnce(() => {
    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var g = d3
      .select("svg")
      .attr("class", "graphD3")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Data strucure
    var partition = d3.partition().size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(nodeData).sum(function (d) {
      return d.size;
    });

    // Size arcs
    partition(root);
    var arc = d3
      .arc()
      .startAngle(function (d) {
        return d.x0;
      })
      .endAngle(function (d) {
        return d.x1;
      })
      .innerRadius(function (d) {
        return d.y0;
      })
      .outerRadius(function (d) {
        return d.y1;
      });

    // Put it all together
    g.selectAll("g")
      .data(root.descendants())
      .enter()
      .append("path")
      .attr("display", function (d) {
        return d.depth ? null : "none";
      })
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function (d) {
        return color((d.children ? d : d.parent).data.name);
      })
      .on("click", function (d) {
        onClickPath(d.data);
        d3.selectAll("path.active").attr("class", "");
        d3.select(this).attr("class", "active");
      });
  });

  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};

export default Graph;
