 
const Admin = require("../models/admin");
const createError = require("http-errors")
//create New Admin
const addAdmin = async (req, res) => {
  const data = new Admin(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get Admin by id
const getAdmin = async (req, res) => {
  const adminId = req.params.id;
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw createError(404, "Admin not found");
  }

  res.json({ status: true, data: admin});
};
//update Admin
const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  let admin = await Admin.findById(adminId);

  if (!admin) {
    throw createError(404, "Admin not found");
  }
  admin.set(req.body);
  await admin.save();
  res.status(201).json({ status: true, message: "ok" });
};
//delete Admin
const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;
  const deletedAdmin = await Admin.findByIdAndDelete(adminId);

  if (!deletedAdmin) {
    throw createError(404, "Admin not found");
  }

  res.status(201).json({ status: true, message: "ok" });
};

module.exports = {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin
};
