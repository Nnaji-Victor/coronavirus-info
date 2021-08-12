import React from "react";
// import { useD3 } from "_utils/useD3";
import * as d3 from "d3";
import useResizeObserver from "_utils/useResizeObserver";

const key = ["cases"];
const color = {
  cases: "#ca6c87",
};
const LineGraph = ({ data }) => {
  const svgRef = React.useRef();
  const wrapperRef = React.useRef();
  const dimensions = useResizeObserver(wrapperRef);
  //   d3.select(svgRef.current).remove()

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);
    const height = 700;
    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.cases)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );

    svg.append("g").call(yAxis);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    svg.append("g").call(xAxis);

    const line = d3
      .line()
      .defined((d) => !isNaN(d.cases))
      .x((d) => x(d.date))
      .y((d) => y(d.cases));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
      
  }, [data, dimensions]);

  return (
    <span ref={wrapperRef} style={{ height: 700, width: "100%" }}>
      <svg ref={svgRef}></svg>
    </span>
  );
};

export default LineGraph;
