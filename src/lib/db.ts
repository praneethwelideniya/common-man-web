import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_CONNECTION;

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(MONGODB_URI!);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
