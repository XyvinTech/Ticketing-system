const Department = require("../models/department");

exports.createDepartment = async function (req, res) {
  const { departmentName } = req.body;

  const existing = await Department.findOne({ departmentName });
  if (existing) {
    return res.status(409).json({ message: "Department already exists" });
  }

  await Department.create(req.body);

  res
    .status(201)
    .json({ status: true, message: "Department added successfully" });
};

exports.editDepartment = async function (req, res) {
  const { departmentId } = req.params;
  const { members } = req.body;
  const { action } = req.query;

  let department = await Department.findById(departmentId);
  if (!department) {
    return res.status(404).json({ message: "Department not found" });
  }
  if (action === "push") {
    members.forEach((memberId) => {
      department.members.push(memberId);
    });
  } else if (action === "pop") {
    const userId = department.members.findIndex((user) => user === members);
    department.members.splice(userId, 1);
  }
  department = await department.save();

  return res
    .status(200)
    .json({ status: true, message: "Department updated", department });
};

exports.removeMember = async (req, res) => {
  const { departmentId } = req.params;
  const memberId = Object.keys(req.body)[0];
  
  const department = await Department.findById(departmentId);
  if (!department) {
    return res.status(404).json({ message: "Department not found" });
  }
  department.members.pull(memberId);
  const updatedDepartment = await department.save();
  res.status(200).json({
    status: true,
    message: "Member removed from department successfully",
    department: updatedDepartment,
  });
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

  res
    .status(200)
    .json({ status: true, message: "Department deleted successfully" });
};
