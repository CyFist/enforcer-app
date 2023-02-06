import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(URI, options);
let clientPromise;

if (!URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.MONGODB_URI !== "production") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's better to not use a global variable
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient clientPromise
// separate module, the client can be shared across functions

export default clientPromise;
