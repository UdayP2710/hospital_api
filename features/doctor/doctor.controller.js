import { doctor } from "../model/doctor.schema.js";
import jwt from "jsonwebtoken";

const registerDoctor = async (req, res) => {
  // function to register new doctor.....
  try {
    const { username, password } = req.body;
    const doctor_register = await new doctor({ username, password }).save();
    res.status(200).json({ msg: "doctor registerd successfully!!!!!" });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong while registering doctor!!!!!please try again later!!!!!",
      error: err,
    });
  }
};
const loginDoctor = async (req, res) => {
  // function to login doctor.......
  try {
    const { username, password } = req.body;
    const check_username = await doctor.findOne({ username });
    if (!check_username) {
      return res.status(400).json({ msg: "user not found!!!!!!" });
    }
    const check_pass = await doctor.findOne({ password });
    if (!check_pass) {
      return res.status(400).json({ msg: "incorrect password!!!!!!" });
    }
    const sign_token = jwt.sign({ user: check_username }, "doctorkey", {
      // generating json web token......
      expiresIn: "2h",
    });
    res.cookie("token", sign_token);
    return res
      .status(200)
      .json({ msg: "login sucessfully!!!!!", generated_token: sign_token });
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong while loging doctor!!!!!please try again later!!!!!",
      error: err,
    });
  }
};

export const doctorObj = { registerDoctor, loginDoctor };
