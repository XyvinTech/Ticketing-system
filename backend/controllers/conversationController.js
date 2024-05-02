const Conversation = require("../models/conversation");
const createError = require("http-errors");

//create conversation
exports.createConversation = async function (req, res) {
  const conversationData = req.body;
  conversationData.senderId = req.user; // Set senderId to req.user

  try {
    const conversation = new Conversation(conversationData);
    await conversation.save();
    res.status(201).json({ status: true, message: "Added Successfully", data: conversation });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error occurred while adding conversation", error });
  }
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
    return res.status(400).json({ message: "Ticket ID is required" });
  }
  const conversations = await Conversation.find({ ticketId: ticketId }).populate("ticketId").populate("senderId");

  if (!conversations || conversations.length === 0) {
    return res.status(404).json({ status: false, message: "Conversations not found" });
  }
  res.status(201).json({ status: true, message: "ok",data:conversations });

  
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

