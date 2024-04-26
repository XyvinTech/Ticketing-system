const Department = require("../models/department");

exports.createDepartment = async function (req, res) {
  const { departmentName } = req.body;

  const existing = await Department.findOne({ departmentName });
  if (existing) {
    return res.status(409).json({ message: "Department already exists" });
  }

  await Department.create(req.body);

  res.status(201).json({ status: true, message: "Department added successfully" });
};

exports.editDepartment = async function (req, res) {
  const { departmentId } = req.params;

  const department = await Department.findByIdAndUpdate(departmentId, req.body, { new: true });
  if (!department) {
    return res.status(409).json({ message: "Department not found" });
  }

  res.status(200).json({ status: true, message: "Department updated", department });
};
