import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL NOT FOUND");
  if (isConnected) return console.log("CONNECTED TO DB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log(error);
  }
}
