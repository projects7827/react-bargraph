import { useD3 } from './d3';
import React, { useState } from 'react';
import * as d3 from 'd3';

const Graph = (prop) => {
  const [state, updateState] = useState({ data: [{ "year": 1980, "sales": 10000 }] });
  const heightDiffernce = 160;
  const widthDiffernce = 80;

  React.useEffect(() => {
    getRandomData();
    document.body.style.margin="auto";
  }, [])

  const getRandomData = () => {
    let arr = [];
    let initialYear = 1980;
    let initialSales = 10000;
    let randomValue;
    for (let i = 0; i <= 40; i++) {
      randomValue = Math.floor(Math.random() * (10000000 - 100000) + 100);
      arr.push({ "year": initialYear++, "sales": randomValue })
    }
    console.log(arr);
    updateState({ ...state, data: arr });
  }


  const ref = useD3(
    (svg) => {
      const height = window.innerHeight - heightDiffernce;
      const width = window.innerWidth - widthDiffernce;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(state.data.map((d) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(state.data, (d) => d.sales)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(state.data.y1)
          );

      svg.select(".barGraph__x-axis").call(xAxis);
      svg.select(".barGraph__y-axis").call(y1Axis);

      svg
        .select(".barGraph__plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(state.data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.sales))
        .attr("height", (d) => y1(0) - y1(d.sales));
    },
    [state.data.length, state.data]
  );

  return (<>

    <header className='mainHeader'>
      <h1 className='mainHeader__heading'>Welcome {prop.name} !!! </h1>
      <button onClick={getRandomData} className="mainHeader__changeData">Change Value</button>

    </header>
    <div className='barGraph'>

      <svg
        ref={ref}
        style={{
          height: window.innerHeight - heightDiffernce,
          width: window.innerWidth - widthDiffernce,
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="barGraph__plot-area" />
        <g className="barGraph__x-axis" />
        <g className="barGraph__y-axis" />
      </svg>

    </div>


  </>);
}

export default Graph;