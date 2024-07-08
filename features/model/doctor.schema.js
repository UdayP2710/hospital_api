import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
});
export const doctor = mongoose.model("doctor", doctorSchema);
