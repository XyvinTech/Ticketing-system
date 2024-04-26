const Admin = require("../models/admin");
const generateToken = require("../utils/generateToken");

exports.signUp = async function (req, res) {
  const { email, userName } = req.body;

  const existingUser = await Admin.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this email or username" });
  }

  await Admin.create(req.body);

  res.status(201).json({ status: true, message: "Signup successfully" });
};

exports.logIn = async function (req, res) {
  const { email, password } = req.body;

  const findUser = await Admin.findOne({ email });

  if (!findUser) return res.status(400).json({ message: "User not found" });

  if (findUser && (await findUser.matchPassword(password))) {
    const token = generateToken(findUser._id);
    return res.status(200).json({ message: "Login successfull", token: token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
