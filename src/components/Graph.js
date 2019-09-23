import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { sortNumber, linearRegression } from "./LinearRegression";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewYork: {},
      LosAngeles: {},
      Chicago: {},
      indicator: "average_high_temperature",
      yLabel: "",
      hasLoaded: false,
      showTrend: false,
      showDots: 6,
      showLine: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTrend = this.handleTrend.bind(this);
    this.handleDots = this.handleDots.bind(this);
    this.handleLine = this.handleLine.bind(this);
  }

  handleChange(event) {
    this.setState({ indicator: event.target.value }, () => this.showCities());
  }
  handleTrend() {
    this.setState({ showTrend: !this.state.showTrend });
  }
  handleDots() {
    if (this.state.showDots === 6) {
      this.setState({ showDots: 0 });
    } else {
      this.setState({ showDots: 6 });
    }
  }
  handleLine() {
    this.setState({ showLine: !this.state.showLine });
  }

  headers() {
    return {
      headers: {
        Authorization: "Token 1a740d6aef7f5638ca7ec085a938085e8218f5f5"
      }
    };
  }

  NewYork() {
    axios
      .get("https://app.climate.azavea.com/api/climate-data/1/RCP85/indicator/" + this.state.indicator + "/?years=2006:2030&units=C", this.headers())
      .then(response => {
        this.setState({
          NewYork: response.data.data,
          yLabel: response.data.indicator.label,
          hasLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  LosAngeles() {
    axios
      .get("https://app.climate.azavea.com/api/climate-data/2/RCP85/indicator/" + this.state.indicator + "/?years=2006:2030&units=C", this.headers())
      .then(response => {
        this.setState({
          LosAngeles: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  Chicago() {
    axios
      .get("https://app.climate.azavea.com/api/climate-data/3/RCP85/indicator/" + this.state.indicator + "/?years=2006:2030&units=C", this.headers())
      .then(response => {
        this.setState({
          Chicago: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  showCities() {
    this.NewYork();
    this.LosAngeles();
    this.Chicago();
  }

  componentDidMount() {
    this.showCities();
  }

  render() {
    /* NEWYORK /////////// */
    const NY = Object.keys(this.state.NewYork).map(key => {
      return { year: Number(key), max: this.state.NewYork[key].max };
    });
    //trendline
    let x_coords_NY = NY.map(item => {
      return item.year;
    });
    let y_coords_NY = NY.map(item => {
      return item.max;
    });
    const trendline_NY = linearRegression(y_coords_NY, x_coords_NY);
    const lowest_x_NY = x_coords_NY.sort(sortNumber)[0];
    const highest_x_NY = x_coords_NY.sort(sortNumber)[x_coords_NY.length - 1];
    const trendline_points_NY = [[lowest_x_NY, trendline_NY(lowest_x_NY)], [highest_x_NY, trendline_NY(highest_x_NY)]];

    /* LOS ANGELES //////////////// */
    const LA = Object.keys(this.state.LosAngeles).map(key => {
      return { year: Number(key), max: this.state.LosAngeles[key].max };
    });
    //trendline
    let x_coords_LA = LA.map(item => {
      return item.year;
    });
    let y_coords_LA = LA.map(item => {
      return item.max;
    });
    const trendline_LA = linearRegression(y_coords_LA, x_coords_LA);
    const lowest_x_LA = x_coords_LA.sort(sortNumber)[0];
    const highest_x_LA = x_coords_LA.sort(sortNumber)[x_coords_LA.length - 1];
    const trendline_points_LA = [[lowest_x_LA, trendline_LA(lowest_x_LA)], [highest_x_LA, trendline_LA(highest_x_LA)]];

    /* CHICAGO //////////*/
    const Chicago = Object.keys(this.state.Chicago).map(key => {
      return { year: Number(key), max: this.state.Chicago[key].max };
    });
    //trendline
    let x_coords_CHIC = Chicago.map(item => {
      return item.year;
    });
    let y_coords_CHIC = Chicago.map(item => {
      return item.max;
    });
    const trendline_CHIC = linearRegression(y_coords_CHIC, x_coords_CHIC);
    const lowest_x_CHIC = x_coords_CHIC.sort(sortNumber)[0];
    const highest_x_CHIC = x_coords_CHIC.sort(sortNumber)[x_coords_CHIC.length - 1];
    const trendline_points_CHIC = [[lowest_x_CHIC, trendline_CHIC(lowest_x_CHIC)], [highest_x_CHIC, trendline_CHIC(highest_x_CHIC)]];

    const data = {
      datasets: [
        {
          label: "New York",
          data: NY.map(item => {
            return { x: item.year, y: item.max.toFixed(2) };
          }),
          pointBackgroundColor: "black",
          borderColor: "black",
          backgroundColor: "black",
          borderWidth: 1,
          showLine: this.state.showLine,
          fill: false,
          pointStyle: "cross",
          pointRadius: this.state.showDots
        },
        {
          label: "NY trendline Hide",
          data: [{ x: trendline_points_NY[0][0], y: trendline_points_NY[0][1] }, { x: trendline_points_NY[1][0], y: trendline_points_NY[1][1] }],
          borderColor: "black",
          backgroundColor: "black",
          borderWidth: 2,
          showLine: this.state.showTrend,
          fill: false,
          pointRadius: 0
        },

        {
          label: "Los Angeles",
          data: LA.map(item => {
            return { x: item.year, y: item.max.toFixed(2) };
          }),
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          borderWidth: 1,
          showLine: this.state.showLine,
          fill: false,
          pointStyle: "triangle",
          pointRadius: this.state.showDots
        },
        {
          label: "LA trendline Hide",
          data: [{ x: trendline_points_LA[0][0], y: trendline_points_LA[0][1] }, { x: trendline_points_LA[1][0], y: trendline_points_LA[1][1] }],
          borderColor: "red",
          backgroundColor: "red",
          borderWidth: 2,
          showLine: this.state.showTrend,
          fill: false,
          pointRadius: 0
        },
        {
          label: "Chicago",
          data: Chicago.map(item => {
            return { x: item.year, y: item.max.toFixed(2) };
          }),
          pointBackgroundColor: "blue",
          borderColor: "blue",
          backgroundColor: "blue",
          borderWidth: 1,
          showLine: this.state.showLine,
          fill: false,
          pointRadius: this.state.showDots
        },
        {
          label: "Chicago trendline Hide",
          data: [{ x: trendline_points_CHIC[0][0], y: trendline_points_CHIC[0][1] }, { x: trendline_points_CHIC[1][0], y: trendline_points_CHIC[1][1] }],
          borderColor: "blue",
          backgroundColor: "blue",
          borderWidth: 2,
          showLine: this.state.showTrend,
          fill: false,
          pointRadius: 0
        }
      ],

      options: {
        maintainAspectRatio: false,
        legend: {
          onClick: e => e.stopPropagation(),
          position: "bottom",
          labels: {
            usePointStyle: false,
            filter: function(item) {
              // Logic to remove a particular legend item goes here
              return !item.text.includes("Hide");
            },
            fontSize: 20,
            padding: 20
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 14
              },
              scaleLabel: {
                display: true,
                labelString: this.state.yLabel + " °C",
                fontSize: 14
              }
            }
          ],
          xAxes: [
            {
              labels: LA.map(item => {
                return item.year;
              }),
              ticks: {
                maxTicksLimit: 24,
                fontSize: 14
              },
              scaleLabel: {
                display: true,
                labelString: "Year",
                fontSize: 16
              }
            }
          ]
        }
      }
    };
    return (
      <div className="container">
        {this.state.hasLoaded ? (
          <div className="center">
            <div className="center">
              <h2>Climate Change Forecaster</h2>
            </div>
            <div className="center">
              <select value={this.state.city} onChange={this.handleChange}>
                <option value="average_high_temperature">Average High Temperature</option>
                <option value="average_low_temperature">Average Low Temperature</option>
                <option value="max_high_temperature">Max High Temperature</option>
                <option value="min_low_temperature">Min Low Temperature</option>
              </select>
              <button className="button" onClick={this.handleTrend}>
                Show / Hide Trend Lines
              </button>
              <button className="button" onClick={this.handleDots}>
                Show / Hide Ticks
              </button>
              <button className="button" onClick={this.handleLine}>
                Show / Hide Line
              </button>
            </div>
            <div className="canvasWrapper">
              <Line data={data} options={data.options} />
            </div>

            <div className="center grey">
              Data from{" "}
              <a href="https://climate.azavea.com/" target="_blank" rel="noopener noreferrer">
                Azavea Climate API
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Graph;
