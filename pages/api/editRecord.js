import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("enfrocer");
    const { id } = req.query;
    const { BF_Date, Quiz_Date } = req.body;

    const post = await db.collection("records").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          BF_Date: BF_Date,
          Quiz_Date: Quiz_Date,
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};