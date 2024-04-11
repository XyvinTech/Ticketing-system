const Project = require("../models/project");
const createError = require("http-errors");
//create project
module.exports.createProject = async function(req, res) {
  const data = new Project(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get all project
module.exports.getAll = async function(req, res) {
  const projects = await Project.find();
  res.status(200).json({ status: true, message: "OK", data: projects });
};
//get project by id
module.exports.getProject = async function(req, res) {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  if (!project) {
    throw createError(404, "Project not found");
  }

  res.json({ status: true, data: project });
};
//update project
module.exports.updateProject = async function(req, res) {
  const projectId = req.params.id;
  const update = req.body; 
  const project = await Project.findByIdAndUpdate(projectId, update, { new: true });

  if (!project) {
    throw createError(404, "Project not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
//delete project
module.exports.deleteProject = async function(req, res) {
  const projectId = req.params.id;
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw createError(404, "Project not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};


