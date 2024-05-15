const Department = require("../models/department");
const User = require("../models/user");

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

exports.editDepartmentMember = async function (req, res) {
  const { departmentId } = req.params;
  const { members } = req.body;
  const { action } = req.query;
  // console.log(members);
  let department = await Department.findById(departmentId);
  if (!department) {
    return res.status(404).json({ message: "Department not found" });
  }
  if (action === "push") {
    members.forEach((memberId) => {
      department.members.push(memberId);
    });
  } else if (action === "pop") {
    const memberId = Object.keys(req.body)[0];

    const userIdx = department.members.findIndex((user) =>
      user.equals(memberId)
    );
    if (userIdx !== -1) {
      department.members.splice(userIdx, 1);
    } else {
      return res
        .status(404)
        .json({ message: "Member not found in department" });
    }
  }

  department = await department.save();

  return res
    .status(200)
    .json({ status: true, message: "Department updated", department });
};

exports.getDepartments = async function (req, res) {
  const data = await Department.aggregate([
    {
      $lookup: {
        from: "users", // The collection to join with
        localField: "_id", // The field from the Department collection
        foreignField: "departmentId", // The field from the User collection
        as: "depUser", // The field to store the joined documents
      },
    },
    {
      $lookup: {
        from: "users", // The collection to join with
        localField: "members", // The field from the Department collection
        foreignField: "_id", // The field from the User collection
        as: "members", // The field to store the joined documents
      },
    },
  ]);

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
exports.updateDepartment = async function (req, res) {
  const depId = req.params.id;
  const update = req.body;
  const dep = await Department.findByIdAndUpdate(depId, update, { new: true });

  if (!dep) {
    throw createError(404, "Department not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
