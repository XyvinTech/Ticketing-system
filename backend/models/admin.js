const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://image-upload-oxium.s3.ap-south-1.amazonaws.com/users/acute.png",
    },
  },
  { timestamps: true }
);

adminSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;
