import clientPromise from "lib/mongodb";

/* async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    movies = await db.collection("records");
  } catch (error) {
    throw new error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})(); */

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("enforcer");

    const data = await db
      .collection("records")
      .find({})
      .sort({ user: 1 })
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
}
