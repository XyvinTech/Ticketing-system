const User = require("../models/user");
const createError = require("http-errors");
//get user
exports.getUser = async function (req, res) {
  const userId = req.user;
  const user = await User.findById(userId);
  

  if (!user) {
    throw createError(404, "User not found");
  }

  res.json({ status: true, data: user });
};

//profile Updation
exports.updateUser = async function (req, res) {
  const userId = req.user;
  const update = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  });

  if (!updatedUser) {
    throw createError(404, "Admin not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

//password Updation
exports.passwordupdate = async function (req, res) {
  const { currentPassword, newPassword } = req.body;

  const findUser = await User.findById(req.user);

  if (!findUser) return res.status(400).json({ message: "User not found" });

  if (findUser && (await findUser.matchPassword(currentPassword))) {
    findUser.password = newPassword;
    await findUser.save();
    return res.status(200).json({ status: true, message: "Password updated" });
  } else {
    return res.status(401).json({ message: "Current password is invalid" });
  }
};
exports.getUserByProjectId = async function (req, res) {
  const { withOutClient,inManager,inLead} = req.query;
  const projectId = req.params.id;
  if (projectId === "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Invalid projectId" });
  }
  const query = { projectId: projectId };
  if (withOutClient) {
    query.usertype = { $nin: ["client", "admin"] };
  }
  if (inManager) {
    query.usertype = { $nin: ["client", "admin","manager"] };
  }
  if(inLead){
    query.usertype={$nin :["client","admin","manager","projectLead"]}
  }
  const data = await User.find(query);
  if (!data || data.length === 0) {
    return res.status(404).json({
      status: false,
      message: "No user found for the provided project ID",
    });
  }

  res.status(200).json({ status: true, message: "ok", data: data });
};
