const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
    projectLead: {
      type: Schema.Types.ObjectId,
      ref: "users",
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
