import { ObjectId } from "mongodb";

export default function handler(req, res) {
  res.status(200).json({ id: new ObjectId() });
}
