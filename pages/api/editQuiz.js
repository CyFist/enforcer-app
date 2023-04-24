import { PermPhoneMsgOutlined, PermPhoneMsgRounded } from "@mui/icons-material";
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const msg = req.body;
    const id = req.query;
    //const { _id, ...body } = msg;

    const filter = {
      _id: new ObjectId(id),
    };

    const update = {
      $set: msg,
    };
    const options = {};

    const data = await db.collection("Quiz").updateOne(filter, update, options);

    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
