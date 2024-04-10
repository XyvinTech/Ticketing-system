const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "tickets",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    message: {
      type: String,
      required: true,
    },
    attachment: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversations", conversationSchema);

module.exports = Conversation;
