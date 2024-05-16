const Admin = require("../models/admin");
const createError = require("http-errors");
const User = require("../models/user");
const Department = require("../models/department");
const Project = require("../models/project");
/* The `exports.addUser` function is responsible for adding a new user to the system. Here's a
breakdown of what it does: */

exports.addUser = async function (req, res) {
  try {
    const { email, userName } = req.body;

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email or username" });
    }

    await User.create(req.body);


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


    // Delete the user
    const deletedAdmin = await User.findByIdAndDelete(UserId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: true, message: "User deleted successfully" });

};


exports.getUsers = async function (req, res) {
  const { usertype, searchQuery, withOutClient, inManager, inLead,managerUsers } = req.query;

  console.log("data",inManager)
  const query = {};

  if (usertype) {
    query.usertype = usertype;
  }
  if (managerUsers) {
    query.usertype = "manager";
    // Exclude the current authenticated user
    query._id = { $ne: req.user };
  }
  if (withOutClient) {
    query.usertype = { $nin: ["client", "admin"] };
  }

  if (inManager) {
    const authUser = await User.findById(req.user);
    if (authUser && authUser.departmentId) {
      query.departmentId = authUser.departmentId;
      query.usertype = { $nin: ["client", "admin", "manager"] };
    }
  }
  

  if (inLead) {
    const authUser = await User.findById(req.user);
    if (authUser && authUser.departmentId) {
      query.departmentId = authUser.departmentId;
    query.usertype = {
      $nin: ["client", "admin", "manager", "projectLead"],
    };}
  }

  if (searchQuery) {
    matchStage.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }


  const data = await User.find(query).select("-password").populate("projectId").populate("departmentId")


  res.status(200).json({ status: true, message: "Users list", data });
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
   

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: true, message: "User updated successfully" });

};
