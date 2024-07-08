import express from "express";
import { connectToDatabase } from "../database_config/mongodb.js";
import { doctor_router } from "../doctor/doctor.route.js";
import { patient_route } from "../patient/patient.route.js";
import cookie from "cookie-parser";
const app = express();
app.use(cookie());
app.use(express.json());
app.use("/doctor", doctor_router); // doctor routes......
app.use("/patients", patient_route); // patient routes......
app.listen(8500, () => {
  console.log("server is listening at port 8500!!!!!");
  connectToDatabase();
});
