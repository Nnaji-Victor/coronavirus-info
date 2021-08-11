import React from "react";
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from "d3";
import { useD3 } from "_utils/useD3";
import useResizeObserver from "_utils/useResizeObserver";
import styled from "styled-components";

function BarChart({ data }) {}

function StackedBarChart({ data, keys, colors }) {
  const svgRef = React.useRef();
  const wrapperRef = React.useRef();
  const dimensions = useResizeObserver(wrapperRef);

  React.useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale = scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width]);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const yAxis = axisLeft(yScale).tickFormat(function (d) {
      if (d / 1000 >= 1) {
        d = d / 1000000 + "m";
      }
      return d;
    });
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => xScale(sequence.data.date))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
  }, [data, dimensions, keys, colors]);

  return (
    <StyledBarChart>
      <span ref={wrapperRef}>
        <svg ref={svgRef} viewBox="">
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </span>
      <span className="key-container">
          <span className="recovered">
            Recovered
          </span>
          <span className="death">
            Death
          </span>
      </span>
    </StyledBarChart>
  );
}

const StyledBarChart = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    .key-container{
        position: absolute;
        bottom: -10rem;
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;

        .recovered{
            margin-bottom: 1.2rem;
            position: relative;
            &::before{
                background: #596ab0;
                display: inline-block;
                content: "";
                margin-right: 1.2rem;
                width: 3rem;
                height: 1rem;
            }
        }
        .death{
            position: relative;
            &::before{
                background: #ca6c87;
                display: inline-block;
                content: "";
                margin-right: 1.2rem;
                width: 3rem;
                height: 1rem;
            }
        }
    }
`;

export { BarChart, StackedBarChart };
