import axios from "axios";
import _ from "lodash";

const mongodb = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const mongoPost = async (endpoint, msg) => {
  try {
    let res = await mongodb.post(endpoint, msg);
    if (res.status >= 200 && res.status <= 299) {
      console.log("success", res);
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
};
const mongoGet = async (endpoint) => {
  try {
    const res = await mongodb.get(endpoint);

    const data = res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { mongoPost, mongoGet };
