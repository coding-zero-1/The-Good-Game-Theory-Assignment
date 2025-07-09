import mongoose from "mongoose";

const dbConnection = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Connection to MongoDb successful");
  } catch (error) {
    console.log(`Error connecting to MongoDb: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;
