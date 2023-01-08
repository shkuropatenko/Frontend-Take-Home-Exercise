import axios from "axios";

const instance = axios.create({
  baseURL: "https://frontend-take-home.fetchrewards.com/form",
  timeout: 5000,
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;
