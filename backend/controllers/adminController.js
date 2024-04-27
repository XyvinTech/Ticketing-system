const Admin = require("../models/admin");
const createError = require("http-errors");
const User = require("../models/user");
//create New Admin
exports.addAdmin = async function (req, res) {
  const data = new Admin(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get Admin by id
exports.getAdmin = async function (req, res) {
  const adminId = req.user;
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw createError(404, "Admin not found");
  }

  res.json({ status: true, data: admin });
};
//update Admin
exports.updateAdmin = async function (req, res) {
  const adminId = req.user;
  const update = req.body;

  const updatedAdmin = await Admin.findByIdAndUpdate(adminId, update, { new: true });

  if (!updatedAdmin) {
    throw createError(404, "Admin not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

//delete Admin
exports.deleteAdmin = async function (req, res) {
  const adminId = req.params.id;
  const deletedAdmin = await Admin.findByIdAndDelete(adminId);

  if (!deletedAdmin) {
    throw createError(404, "Admin not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

/* The `exports.addUser` function is responsible for adding a new user to the system. Here's a
breakdown of what it does: */
exports.addUser = async function (req, res) {
  const { email, userName, projectId } = req.body;

  if (!projectId) return res.status(409).json({ message: "Project Id is required" });

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this email or username" });
  }

  await User.create(req.body);

  res.status(201).json({ status: true, message: "User added successfully" });
};

/* The `exports.deleteUser` function is responsible for deleting a user from the system based on the
provided user ID. Here's a breakdown of what it does: */
exports.deleteUser = async function (req, res) {
  const UserId = req.params.id;
  const deletedAdmin = await User.findByIdAndDelete(UserId);

  if (!deletedAdmin) {
    throw createError(404, "User not found");
  }

  res.status(200).json({ status: true, message: "User deleted successfully" });
};

exports.getUsers = async function (req, res) {
  const { usertype, searchQuery, withOutClient } = req.query;

  const query = {};

  if (usertype) {
    query.usertype = usertype;
  }

  if (withOutClient) {
    query.usertype = { $ne: "client" };
  }

  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const data = await User.find(query).select("-password");

  res.status(200).json({ status: true, message: "Users list", data });
};

exports.updatePassword = async function (req, res) {
  const { currentPassword, newPassword } = req.body;

  const findUser = await Admin.findById(req.user);

  if (!findUser) return res.status(400).json({ message: "Admin not found" });

  if (findUser && (await findUser.matchPassword(currentPassword))) {
    findUser.password = newPassword;
    await findUser.save();
    return res.status(200).json({ status: true, message: "Password updated" });
  } else {
    return res.status(401).json({ message: "Current password is invalid" });
  }
};
