import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
  },
});
export const report = mongoose.model("report", reportSchema);
