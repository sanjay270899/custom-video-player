import axios from "axios";

// AXIOS Configuration with PEXELS API
export default axios.create({
  baseURL: `https://api.pexels.com`,
  headers: {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY
  }
});
