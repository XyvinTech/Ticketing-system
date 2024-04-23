const Conversation = require("../models/conversation");
const createError = require("http-errors");

//create conversation
exports.createConversation = async function (req, res) {
  const attachmentFilenames = req.files.map(file => file.filename);
  console.log("fkke",attachmentFilenames)
  const data = new Conversation({
    ...req.body,
    attachment: attachmentFilenames
  });
  
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};

// get All Conversation 
exports.getAll = async function (req, res)  {
  const conversations = await Conversation.find();
  res.status(200).json({ status: true, message: "OK", data: conversations });
};
//get all conversations by ticketId
exports.getAllByTicketId = async function (req, res) {
  const ticketId = req.params.id;
  if (!ticketId) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }
  const conversations = await Conversation.find({ ticketId: ticketId }).populate("ticketId");

  if (!conversations || conversations.length === 0) {
    return res.status(404).json({ status: false, message: "Conversations not found" });
  }
  res.status(200).send({ status: true, data: conversations });

  
};

//get conversation by id
exports.getConversation = async function (req, res) {
  const conversationId = req.params.id;
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  res.status(200).send({ status: true, data: conversation });
};
//update conversation
exports.updateConversation = async function(req, res) {
  const conversationId = req.params.id;
  const update=req.body;
  const conversation = await Conversation.findByIdAndUpdate(conversationId,update,{new:true});

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
//delete conversation
exports.deleteConversation = async function(req, res) {
  const conversationId = req.params.id;
  const deletedConversation = await Conversation.findByIdAndDelete(conversationId);

  if (!deletedConversation) {
    throw createError(404, "Conversation not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

