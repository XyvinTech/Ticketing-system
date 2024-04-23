
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: Number,
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
      profilePicture: {
        type: String,
        default:
          'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
      },
      usertype: {
        type: String,
        enum: ['projectManager','projectLead', 'client', 'member'] 
      },
      projectId: [{
        type: Schema.Types.ObjectId,
        ref: "projects",
      }],
    },
    { timestamps: true }
  );
  

const User = mongoose.model('users',userSchema);

module.exports = User;
