const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // & disable option
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      
    ],
    departmentManager: [{
      type: Schema.Types.ObjectId,
      ref: "users",
    },],
  },
  { timestamps: true }
);

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;
