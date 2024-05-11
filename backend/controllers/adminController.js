const Admin = require("../models/admin");
const createError = require("http-errors");
const User = require("../models/user");
const Department = require("../models/department");
const Project = require("../models/project");
/* The `exports.addUser` function is responsible for adding a new user to the system. Here's a
breakdown of what it does: */

exports.addUser = async function (req, res) {
  const { email, userName, department, usertype } = req.body;
  // if (usertype === "member") {
  //   console.log("usertye", usertype);
  // }
  // if (!projectId) return res.status(409).json({ message: "Project Id is required" });

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists with this email or username" });
  }

  const newUser = await User.create(req.body);
  if (department) {
    const targetDepartment = await Department.findById(department);

    if (targetDepartment) {
      targetDepartment.departmentManager = newUser._id; // Assuming departmentManager is a reference to the user
      await targetDepartment.save();
    } else {
      console.error(`Department ${department} not found.`);
    }
  }
  res.status(201).json({ status: true, message: "User added successfully" });
};

/* The `exports.deleteUser` function is responsible for deleting a user from the system based on the
provided user ID. Here's a breakdown of what it does: */
exports.deleteUser = async function (req, res) {
  const UserId = req.params.id;
  const isDepartmentManager = await Department.find({ departmentManager: UserId });
  // console.log("isDepartmentManager",isDepartmentManager)
  if(isDepartmentManager){
    await Department.updateOne(
      { departmentManager: UserId },
      { $unset: { departmentManager: "" } }
    );
  }
  const deletedAdmin = await User.findByIdAndDelete(UserId);

  if (!deletedAdmin) {
    throw createError(404, "User not found");
  }

  res.status(200).json({ status: true, message: "User deleted successfully" });
};

exports.getUsers = async function (req, res) {
  const { usertype, searchQuery, withOutClient, inManager, inLead } = req.query;

  const matchStage = {};

  if (usertype) {
    matchStage.usertype = usertype;
  }

  if (withOutClient) {
    matchStage.usertype = { $nin: ["client", "admin"] };
  }

  if (inManager) {
    matchStage.usertype = { $nin: ["client", "admin", "manager"] };
  }

  if (inLead) {
    matchStage.usertype = {
      $nin: ["client", "admin", "manager", "projectLead"],
    };
  }

  if (searchQuery) {
    matchStage.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const users = await User.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "projects",
        localField: "projectId",
        foreignField: "_id",
        as: "projectId",
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "departmentManager",
        as: "department",
      },
    },
    // ,{
    //   $project:{
    //     _id:1,
    //     departmentName:"$department.departmentName"
    //   }
    // }
  ]);

  res.status(200).json({ status: true, message: "Users list", data: users });
};

// exports.updatePassword = async function (req, res) {
//   const { currentPassword, newPassword } = req.body;

//   const findUser = await Admin.findById(req.user);

//   if (!findUser) return res.status(400).json({ message: "Admin not found" });

//   if (findUser && (await findUser.matchPassword(currentPassword))) {
//     findUser.password = newPassword;
//     await findUser.save();
//     return res.status(200).json({ status: true, message: "Password updated" });
//   } else {
//     return res.status(401).json({ message: "Current password is invalid" });
//   }
// };
exports.updateAdminUser = async function (req, res) {
  const userId = req.params.id;
  const update = req.body;

  const isDepartmentManager = await Department.exists({
    departmentManager: userId,
  });
 
  if (isDepartmentManager) {
    return res
      .status(400)
      .json({ status: false, message: "User is already a department manager" });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  });
  if (!updatedUser) {
    throw createError(404, "User not found");
  }
  res.status(200).json({ status: true, message: "User updated successfully" });
};
