import clientPromise from "lib/mongodb";
import _ from "lodash";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");

    const records = await db.collection("Quiz").find({}).toArray();

    res.json(records);
  } catch (e) {
    console.error(e);
  }
};
