const Admin = require("../models/admin");
const createError = require("http-errors");
const User = require("../models/user");
const Department = require("../models/department");
const Project = require("../models/project");
/* The `exports.addUser` function is responsible for adding a new user to the system. Here's a
breakdown of what it does: */

exports.addUser = async function (req, res) {
  try {
    const { email, userName, department, usertype } = req.body;

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email or username" });
    }

    // Create the new user
    const newUser = await User.create(req.body);

    // If a department is specified, update the department manager array
    if (department) {
      const targetDepartment = await Department.findById(department);
      if (!targetDepartment) {
        return res.status(404).json({ message: "Department not found" });
      }
      
      // Add the new user ID to the departmentManager array
      targetDepartment.departmentManager.push(newUser._id);
      await targetDepartment.save();
    }

    res.status(201).json({ status: true, message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


/* The `exports.deleteUser` function is responsible for deleting a user from the system based on the
provided user ID. Here's a breakdown of what it does: */
exports.deleteUser = async function (req, res) {

    const UserId = req.params.id;
    
    const departments = await Department.find({ departmentManager: UserId });

    await Promise.all(departments.map(async (department) => {
      department.departmentManager = department.departmentManager.filter(id => id.toString() !== UserId);
      await department.save();
    }));

    // Delete the user
    const deletedAdmin = await User.findByIdAndDelete(UserId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "User not found" });
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
    const { department } = update;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a department is specified, update the department manager array
    if (department) {
      const targetDepartment = await Department.findById(department);

      if (targetDepartment) {
        // Add the updated user ID to the departmentManager array
        if (!targetDepartment.departmentManager.includes(updatedUser._id)) {
          targetDepartment.departmentManager.push(updatedUser._id);
        }
        await targetDepartment.save();
      } else {
        console.error(`Department ${department} not found.`);
      }
    }

    res.status(200).json({ status: true, message: "User updated successfully" });

};
