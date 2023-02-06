import clientPromise from "lib/mongodb";
import _ from "lodash";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const msg = req.body;
    //const msg = ["WIKI", "ARTISTE"];

    let body;
    /* if (_.isArray(msg)) { */
    body = msg.map((username) => {
      const userbody = {
        user: username,
        BF_Date: null,
        Quiz_Date: null,
        Valid: false,
      };

      return userbody;
    });
    /* } else {
      body = [
        {
          user: msg,
          BF_Date: null,
          Quiz_Date: null,
          Valid: false,
        },
      ];
    } */

    const post = await db.collection("records").insertMany(body);

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
