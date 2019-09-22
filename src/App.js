import React from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewYork: {},
      LosAngeles: {},
      Chicago: {},
      indicator: "average_high_temperature",
      yLabel: "",
      hasLoaded: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ indicator: event.target.value }, () => this.showCities());
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
        console.log(response);

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
    const NY = Object.keys(this.state.NewYork).map(key => {
      return { year: Number(key), max: this.state.NewYork[key].max };
    });
    if (NY.length !== 0) {
      console.log("NY", NY);
    }

    const LA = Object.keys(this.state.LosAngeles).map(key => {
      return { year: Number(key), max: this.state.LosAngeles[key].max };
    });
    const Chicago = Object.keys(this.state.Chicago).map(key => {
      return { year: Number(key), max: this.state.Chicago[key].max };
    });

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
          showLine: true,
          fill: false
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
          showLine: true,
          fill: false
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
          showLine: true,
          fill: false
        }
      ],

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 14
              },
              scaleLabel: {
                display: true,
                labelString: this.state.yLabel + " °C",
                fontSize: 20
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 30,
                fontSize: 14
              },
              scaleLabel: {
                display: true,
                labelString: "Year",
                fontSize: 30
              }
            }
          ]
        }
      }
    };
    return (
      <div>
        {this.state.hasLoaded ? (
          <div>
            <select value={this.state.city} onChange={this.handleChange}>
              <option value="average_high_temperature">Average High Temperature</option>
              <option value="average_low_temperature">Average Low Temperature</option>
              <option value="max_high_temperature">Max High Temperature</option>
              <option value="min_low_temperature">Min Low Temperature</option>
            </select>{" "}
            <Scatter data={data} options={data.options} />
          </div>
        ) : (
          ""
        )}

        {/*  {result.map((item, i) => {
          return (
            <p key={i}>
              {item.year} {parseFloat(item.max).toFixed(2)}
            </p>
          );
        })} */}
      </div>
    );
  }
}
export default App;
