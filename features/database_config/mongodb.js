import mongoose from "mongoose";
export const connectToDatabase = async () => {
  try {
    console.log("Connecting to database.....");
    await mongoose.connect("mongodb://49.36.221.187:27017/hospital_API");
    console.log("Database connected successfully!!!!");
  } catch (err) {
    console.log("something went wrong while connecting to database!!!!!"+"  "+ err);
  }
};
