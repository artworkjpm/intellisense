import React from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: {},
      city: "1"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ city: event.target.value }, () => this.apiCall());
  }

  apiCall() {
    axios
      .get("https://app.climate.azavea.com/api/climate-data/" + this.state.city + "/RCP85/indicator/max_high_temperature/?years=2006:2030&units=C", {
        headers: {
          Authorization: "Token 1a740d6aef7f5638ca7ec085a938085e8218f5f5"
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          temperature: response.data.data[2019].max,
          objects: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.apiCall();
  }

  render() {
    var obj = this.state.objects;
    var result = Object.keys(obj).map(key => {
      return { year: Number(key), max: obj[key].max };
    });
    if (result.length !== 0) {
      console.log("result", result);
    }

    const data = {
      datasets: [
        {
          label: "temperature",
          data: result.map(item => {
            return { x: item.year, y: item.max.toFixed(2) };
          }),
          pointBackgroundColor: "#000"
        }
      ]
    };
    return (
      <div>
        <Scatter data={data} />
        <select value={this.state.city} onChange={this.handleChange}>
          <option value="1">New York</option>
          <option value="2">Los Angeles</option>
          <option value="3">Chicago</option>
        </select>

        {result.map((item, i) => {
          return (
            <p key={i}>
              {item.year} {parseFloat(item.max).toFixed(2)}
            </p>
          );
        })}
      </div>
    );
  }
}
export default App;
