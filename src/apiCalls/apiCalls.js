import axios from "axios";

export const NewYork = axios
  .get("https://app.climate.azavea.com/api/climate-data/1/RCP85/indicator/average_high_temperature/?years=2006:2030&units=C", {
    headers: {
      Authorization: "Token 1a740d6aef7f5638ca7ec085a938085e8218f5f5"
    }
  })
  .then(response => {
    return response.data.data;
  })
  .catch(error => {
    console.log(error);
  });

/* 
NY: 1
LA: 2
CHICAGO:  3 */
