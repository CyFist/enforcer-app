import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    let msg = req.body;
    const { _id } = msg;
    msg._id = new ObjectId(_id);
    const data = await db.collection("LMQuiz").insertOne(msg);

    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
