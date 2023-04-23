import clientPromise from "lib/mongodb";
import _ from "lodash";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const msg = req.body;


    let body;

    body = msg.map((username) => {
      const userbody = {
        user: username,
        BF_Date: [],
        Quiz_Date: [],
      };

      return userbody;
    });

    const data = await db.collection("records").insertMany(body);

    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
