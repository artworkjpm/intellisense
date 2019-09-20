import axios from "axios";

export const NewYork = axios
  .get("https://app.climate.azavea.com/api/city/1751", {
    headers: {
      Authorization: "Token 1a740d6aef7f5638ca7ec085a938085e8218f5f5"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

/* 
NY: 1
LA: 2
CHICAGO:  3 */
