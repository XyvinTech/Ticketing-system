const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // type: {
    //   type: String,
    //   required: true,
    // },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "tickets",
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("notifications", notificationSchema);

module.exports = Notification;
