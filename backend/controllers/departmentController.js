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

exports.getDepartments = async function (req, res) {
  const query = {};

  const data = await Department.find(query).populate({
    path: "members",
    select: "-password",
    populate: {
      path: "projectId",
      select: "projectName",
    },
  });

  res.status(200).json({ status: true, message: "Departments list", data });
};
exports.deleteDepartment = async function (req, res) {
  const depId = req.params.id;
  const deleteDep = await Department.findByIdAndDelete(depId);

  if (!deleteDep) {
    throw createError(404, "User not found");
  }

  res.status(200).json({ status: true, message: "Department deleted successfully" });
};
