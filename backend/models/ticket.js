const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    ticket_Id: {
      type: String
    },
    priority: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
      type: String
    },
    attachment: {
      type: [String],
      default: [],
    },
    projectId: [{
      type: Schema.Types.ObjectId,
      ref: "projects",
    }],
    assignedTo: {
      type: String
    }
  },
  { timestamps: true }
);

const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = Ticket;
