const Project = require("../models/project");
const User = require("../models/user");
const createError = require("http-errors");
//create project
exports.createProject = async function (req, res) {
  const data = new Project(req.body);
  await data.save();
  res.status(201).json({ status: true, message: "New Project added", data });
};
//get all project
exports.getAll = async function (req, res) {
  const { searchQuery, inDep } = req.query;

  const query = {};
  if (inDep) {
    query.departmentId = inDep;
  }
  // if (inMem==="projectLead") {
  //   query.projectLead = { $exists: false };
  // }
  if (searchQuery) {
    query.$or = [
      { projectName: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }
  const projects = await Project.find(query).populate("departmentId");

  res.status(200).json({ status: true, message: "OK", data: projects });
};
//get project by id
exports.getProject = async function (req, res) {
  const { inDep } = req.query;

  const user = await User.findById(req.user);
  const projectIds = user.projectId.map((id) => id.toString());
  const query = {
    _id: { $in: projectIds },
  };
  if (inDep) {
    query.departmentId = inDep;
  }
  const project = await Project.find(query);

  if (!project) {
    throw createError(404, "Project not found");
  }

  res.json({ status: true, data: project });
};
//update project
exports.updateProject = async function (req, res) {
  const projectId = req.params.id;
  const update = req.body;
  const project = await Project.findByIdAndUpdate(projectId, update, {
    new: true,
  });

  if (!project) {
    throw createError(404, "Project not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
//delete project
exports.deleteProject = async function (req, res) {
  const projectId = req.params.id;
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw createError(404, "Project not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};
