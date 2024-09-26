import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Mongodb url is not defined");
  }

  if (isConnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: process.env.MONGODB_DB,
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    isConnected = true;
  } catch (err) {
    console.log("Mongodb connection failed", err);
  }
};
