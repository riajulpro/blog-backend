import mongoose from "mongoose";

const connectedDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connection Created to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectedDB;
