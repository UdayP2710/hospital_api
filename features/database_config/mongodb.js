import mongoose from "mongoose";
export const connectToDatabase = async () => {
  try {
    console.log("Connecting to database.....");
    await mongoose.connect("mongodb+srv://udaypandey20000:nVE8XlR2OxLPeEOE@cluster0.kyg0z1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully!!!!");
  } catch (err) {
    console.log("something went wrong while connecting to database!!!!!"+"  "+ err);
  }
};
