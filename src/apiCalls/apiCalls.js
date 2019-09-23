import axios from "axios";

export const NewYork = () => {
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
};
