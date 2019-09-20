import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
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
      .get("https://app.climate.azavea.com/api/climate-data/" + this.state.city + "/RCP45/indicator/max_high_temperature/?years=1950:2019&units=C", {
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
    const temperature = parseFloat(this.state.temperature).toFixed(2);

    var obj = this.state.objects;
    var result = Object.keys(obj).map(key => {
      return [{ year: String(key), max: obj[key] }];
    });

    console.log(result);
    return (
      <div>
        <select value={this.state.city} onChange={this.handleChange}>
          <option value="1">New York</option>
          <option value="2">Los Angeles</option>
        </select>

        <p>{temperature} not this</p>
        {result.map(item => {
          return (
            <p>
              {item[0].year} {item[0].max.max}
            </p>
          );
        })}
      </div>
    );
  }
}
export default App;
