import clientPromise from "lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");
    const msg = req.body;

    const query = JSON.parse(JSON.stringify({ user: { $in: msg } }));
    const data = await db.collection("records_LM").deleteMany(query);
    res.json(data);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
