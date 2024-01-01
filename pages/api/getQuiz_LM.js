import clientPromise from "lib/mongodb";
import _ from "lodash";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");

    const data = await db.collection("LMQuiz").find({}).toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
}
