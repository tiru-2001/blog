import userm from "../models/User.js";

import bcrypt from "bcrypt";
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide complete information",
      });
    }

    const checkEmailExist = await userm.findOne({ email });
    if (checkEmailExist) {
      return res
        .status(401)
        .send({ success: false, message: "email is already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const finalRegisterResult = await userm({
      name,
      email,
      password: hashedpassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "user registered successfully",
      finalRegisterResult,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something wrong in promises",
      e,
    });
  }
};
//login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "please provide complete information",
      });
    }

    let userexist = await userm.findOne({ email });

    if (!userexist) {
      return res.status(400).send({ success: false, message: "wrong email" });
    }

    const comparePassword = await bcrypt.compare(password, userexist.password);

    if (!comparePassword) {
      return res
        .status(401)
        .send({ success: false, message: "wrong password" });
    }

    return res.status(200).send({
      message: "user logged successfully",
      success: true,
      userexist,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something wrong in login promises",
      e,
    });
  }
};

export const getalluser = async (req, res) => {
  try {
    const alluser = await userm.find();

    return res.status(200).send({
      count: alluser.length,
      message: "we got all users",
      success: true,
      alluser,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "something wrong in login promises",
      e,
    });
  }
};
