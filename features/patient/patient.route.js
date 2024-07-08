import express from "express";
import { patient_obj } from "./patient.controller.js";
import { auth } from "../auth_middleware/jwt.auth.js";
export const patient_route = express.Router();
patient_route.post("/register", auth, patient_obj.registerPatient);
patient_route.post("/:id/checkup", auth, patient_obj.patientCheckUp);
patient_route.post("/:id/create_report", auth, patient_obj.createPatientReport);
patient_route.get("/:id/all_reports", auth, patient_obj.getPatientReports);
patient_route.get(
  "/reports/:status",
  auth,
  patient_obj.getAllReportsOnStatusBasis
);
