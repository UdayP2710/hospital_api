import express from "express";
import { doctorObj } from "./doctor.controller.js";
export const doctor_router = express.Router();
doctor_router.post("/register", doctorObj.registerDoctor);
doctor_router.post("/login", doctorObj.loginDoctor);
