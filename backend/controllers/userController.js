const User = require("../models/user");
const createError = require("http-errors");
const bcryptUtils = require("../utils/bcrypt");
//get user
exports.getUser = async function (req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    throw createError(404, "User not found");
  }

  res.json({ status: true, data: user });
};

//profile Updation
exports.profileUpdate = async function (req, res) {
  const userId = req.params.id;
  
  const updateObj = {};
  if (req.body.userName) {
    updateObj.userName = req.body.userName;
  }
  if (req.body.phoneNumber) {
    updateObj.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.email) {
    updateObj.email = req.body.email;
  }
  if (req.file && req.file.buffer) {
    updateObj.profilePicture = req.file.buffer;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateObj, { new: true });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  res.json({ message: "Profile updated successfully", user: updatedUser });
};

//password Updation
exports.passwordupdate = async function (req, res) {
  const userId = req.params.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {}, { new: true });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcryptUtils.comparePasswords(
    currentPassword,
    updatedUser.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid current password" });
  }

  const hashedPassword = await bcryptUtils.hashPassword(newPassword);

  updatedUser.password = hashedPassword;
  await updatedUser.save();

  res.status(200).json({ message: "Password updated successfully" });
};
