
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
      projectName: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
     
    },
    { timestamps: true }
  );
  

const Project = mongoose.model('projects',projectSchema);

module.exports = Project;
