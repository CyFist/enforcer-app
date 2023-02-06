import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import clientPromise from "../lib/mongodb";
import { mongoPost } from "../utils/mongoHelper";

export async function getStaticProps() {
  try {
    const client = await clientPromise;

    const db = client.db("enforcer");

    const records = await db.collection("records").find({}).toArray();
    return {
      props: { record: JSON.parse(JSON.stringify(records)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Test({ record }) {
  /*   const handleclick = async () => {
    const response = await fetch("/api/addRecords", {
      method: "POST",
      body: JSON.stringify(["Fist", "ATO huhM"]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }; */

  const value = ["TEST1", "TEST2"];
  return (
    <Container>
      {record.map((rec) => (
        <li>{rec.user}</li>
      ))}
      <Button onClick={() => mongoPost("/addRecords", JSON.stringify(value))}>
        test
      </Button>
    </Container>
  );
}
