import React from "react";
import ScatterPlot from "./components/ScatterPlot-with-trendline";

const data = [[0, 3], [5, 13], [10, 22], [15, 36], [20, 48], [25, 59], [30, 77], [35, 85], [40, 95], [45, 105], [50, 120], [55, 150], [60, 147], [65, 168], [70, 176], [75, 188], [80, 199], [85, 213], [90, 222], [95, 236], [100, 249]];

export default class App extends React.Component {
  render() {
    return <ScatterPlot data={data} />;
  }
}
