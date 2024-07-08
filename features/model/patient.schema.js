import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
  name: { type: String },
  phonenum: { type: Number, required: true },
  checkup: { type: Boolean },
  report: [{ type: mongoose.Schema.Types.ObjectId, ref: "report" }],
});
export const patient = mongoose.model("patient", patientSchema);
