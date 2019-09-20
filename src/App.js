import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
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
          temperature: response.data.data[2019].max
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
    return (
      <div>
        <select value={this.state.city} onChange={this.handleChange}>
          <option value="1">New York</option>
          <option value="2">Los Angeles</option>
        </select>

        <p>{temperature}</p>
      </div>
    );
  }
}
export default App;
