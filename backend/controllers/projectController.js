const Project = require("../models/project");
const createError = require("http-errors");
//create project
const createProject = async (req, res) => {
  const data = new Project(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get all project
const getAll = async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ status: true, message: "OK", data: projects });
};
//get project by id
const getProject = async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  if (!project) {
    throw createError(404, "Project not found");
  }

  res.json({ status: true, data: project });
};
//update project
const updateProject = async (req, res) => {
  const projectId = req.params.id;
  let project = await Project.findById(projectId);

  if (!project) {
    throw createError(404, "Project not found");
  }
  project.set(req.body);
  await project.save();
  res.status(201).json({ status: true, message: "ok" });
};
//delete project
const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw createError(404, "Project not found");
  }

  res.status(201).json({ status: true, message: "ok" });
};

module.exports = {
  createProject,
  getProject,
  getAll,
  updateProject,
  deleteProject,
};
