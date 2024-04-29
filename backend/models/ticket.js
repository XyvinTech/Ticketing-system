const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    ticket_Id: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "departments",
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "progress", "completed", "deleted"],
      default: "pending",
    },
    attachment: {
      type: [String],
      default: [],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projects",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = Ticket;
