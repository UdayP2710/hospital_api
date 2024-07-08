import { patient } from "../model/patient.schema.js";
import { report } from "../model/report.schema.js";
const registerPatient = async (req, res) => {
  try {
    const { name, phonenum, checkup } = req.body;
    //check if patient already registerd with the given phone number....
    const patientExist = await patient.findOne({ phonenum });
    if (patientExist) {
      return res.status(400).json({
        msg: "patient with the given phone number already registerd!!!!!!",
        patientExist,
      });
    }
    const newPatient = await new patient({ name, phonenum, checkup }).save();
    return res.status(200).json({
      msg: "patient registerd successfully!!!!!",
      registerd_patient: newPatient,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong while registering patient!!!!!please try again later!!!!!",
    });
  }
};
const patientCheckUp = async (req, res) => {
  try {
    const patient_id = req.params.id;
    const patient_checkup = await patient.findByIdAndUpdate(patient_id, {
      // finding patient on the basis of provided id.......
      checkup: true, // updating the checkup field to true......
    });
    if (patient_checkup) {
      return res.status(200).json({ msg: "checkup is done!!!!!!!" });
    }
    return res
      .status(400)
      .json({ msg: "no patient found with the given id!!!!!!" });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong while checkup patinet operation!!!!!please try again later!!!!!",
    });
  }
};
const createPatientReport = async (req, res) => {
  try {
    const { doctor, status } = req.body;
    const patient_id = req.params.id;
    const Patient = await patient.findById(patient_id); // checking wether pateint with the given id exist or not......
    if (!Patient) {
      return res
        .status(400)
        .json({ msg: "no patient found with the given id!!!!!" });
    }
    if (Patient.checkup === false) {
      // checking wether chek up is done or not....without checkup patient report can't be created....
      return res.status(400).json({ msg: "patient not check up yet!!!!!" });
    }
    const patient_report = await new report({ doctor, status }).save();
    Patient.report.push(patient_report._id); // updating report field of patient and pushing report id of patient in the array field.....
    await Patient.save();
    return res.status(200).json({
      msg: "patient report created successfully!!!!!!",
      report: patient_report,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong while creating patient report!!!!!please try again later!!!!!",
      error: err,
    });
  }
};
const getPatientReports = async (req, res) => {
  try {
    const patient_id = req.params.id;

    const Patient = await patient.findById(patient_id).populate("report");
    if (!Patient) {
      return res
        .status(400)
        .json({ msg: "no patient found with the given id!!!!!" });
    }
    return res
      .status(200)
      .json({ msg: "reports data fetched sucessfully!!!!", Patient });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong while registering patient!!!!!please try again later!!!!!",
    });
  }
};
const getAllReportsOnStatusBasis = async (req, res) => {
  try {
    const status = req.params.status;
    const patient_report = await report.find({ status });
    return res.status(200).json({ patient_report });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong while extracting report!!!!!please try again later!!!!!",
    });
  }
};
export const patient_obj = {
  registerPatient,
  patientCheckUp,
  createPatientReport,
  getAllReportsOnStatusBasis,
  getPatientReports,
};
