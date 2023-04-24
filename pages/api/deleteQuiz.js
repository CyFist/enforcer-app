import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const id = req.query;

    const data = await db
      .collection("Quiz")
      .deleteOne({ _id: new ObjectId(id) });

    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
