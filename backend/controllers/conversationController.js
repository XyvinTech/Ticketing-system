const Conversation = require("../models/conversation");
const createError = require("http-errors");

//create conversation
const createConversation = async (req, res) => {
  const data = new Conversation(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};

// get All Conversation 
const getAll = async (req, res) => {
  const conversations = await Conversation.find();
  res.status(200).json({ status: true, message: "OK", data: conversations });
};

//get conversation by id
const getConversation = async (req, res) => {
  const conversationId = req.params.id;
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  res.json({ status: true, data: conversation });
};
//update conversation
const updateConversation = async (req, res) => {
  const conversationId = req.params.id;
  let conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }
  conversation.set(req.body);
  await conversation.save();
  res.status(201).json({ status: true, message: "ok" });
};
//delete conversation
const deleteConversation = async (req, res) => {
  const conversationId = req.params.id;
  const deletedConversation = await Conversation.findByIdAndDelete(conversationId);

  if (!deletedConversation) {
    throw createError(404, "Conversation not found");
  }

  res.status(201).json({ status: true, message: "ok" });
};
module.exports = {
  createConversation,
  getAll,
  getConversation,
  updateConversation,
  deleteConversation,
};
