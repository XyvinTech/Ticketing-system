 
const Admin = require("../models/admin");
const createError = require("http-errors")
//create New Admin
module.exports.addAdmin = async function(req, res) {
  const data = new Admin(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get Admin by id
module.exports.getAdmin = async function (req, res){
  const adminId = req.params.id;
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw createError(404, "Admin not found");
  }

  res.json({ status: true, data: admin});
};
//update Admin
module.exports.updateAdmin = async function (req, res) {
  const adminId = req.params.id;
  const update = req.body; 

  const updatedAdmin = await Admin.findByIdAndUpdate(adminId, update, { new: true });

  if (!updatedAdmin) {
    throw createError(404, "Admin not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

//delete Admin
module.exports.deleteAdmin = async function(req, res) {
  const adminId = req.params.id;
  const deletedAdmin = await Admin.findByIdAndDelete(adminId);

  if (!deletedAdmin) {
    throw createError(404, "Admin not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};


