const { body, validationResult } = require("express-validator");
const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

module.exports.registerValiations = [
  body("full_name").not().isEmpty().trim().withMessage("Full Name is required"),
  body("phonno").not().isEmpty().trim().withMessage("phone number is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];
module.exports.register = async (req, res) => {
  const { full_name, phonno, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        full_name,
        email,
        password: hash,
        phonno,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created", user });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
module.exports.loginValiations = [
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        return res.status(200).json({ msg: "Login Successfull", data: user });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.updateProfile = async (req, res) => {
  let { full_name, email, phonno, currentImage } = req.body;
  let profile = req.file ? req.file.filename : currentImage;
  try {
    const response = await User.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        full_name,
        email,
        phonno,
        image: profile,
      }
    );
    return res.status(200).json({ msg: "User has been updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUserDetail = async (req, res) => {
  try {
    const response = await User.find({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
};
