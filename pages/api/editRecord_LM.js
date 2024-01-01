import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const msg = req.body;

    const filter = {
      _id: new ObjectId(msg._id),
    };

    const update = {
      $set: {
        BF_Date: msg.BF_Date,
        Quiz_Date: msg.Quiz_Date,
      },
    };
    const options = {};

    const data = await db
      .collection("records_LM")
      .updateOne(filter, update, options);

    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
