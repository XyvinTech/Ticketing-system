const User = require("../models/user");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
//get conversation by id
const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    throw createError(404, "User not found");
  }

  res.json({ status: true, data: user });
};
const profileUpdate = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.file && req.file.buffer) {
      user.profilePicture = req.file.buffer;
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating profile:", error);
    res.status(500).json({ message: error.message });
  }
};

const passwordupdate = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const userId = req.authUser.id;
  const user = await User.findById(userId);
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid current password" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

module.exports = { getUser, profileUpdate, passwordupdate };
