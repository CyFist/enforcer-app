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
    let body;
    if (_.isArray(msg)) {
      body = msg.map((username) => {
        const userbody = {
          User: username,
          BF_Date: null,
          Quiz_Date: null,
          Valid: false,
        };

        return userbody;
      });
    } else {
      body = msg;
    }

    let res = await mongodb.post(endpoint, body);
    if (res.status >= 200 && res.status <= 299) {
      console.log("success");
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
};

export { mongoPost };
