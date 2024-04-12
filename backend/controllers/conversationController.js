const Conversation = require("../models/conversation");
const createError = require("http-errors");

//create conversation
exports.createConversation = async function (req, res) {
  const data = new Conversation(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};

// get All Conversation 
exports.getAll = async function (req, res)  {
  const conversations = await Conversation.find();
  res.status(200).json({ status: true, message: "OK", data: conversations });
};

//get conversation by id
exports.getConversation = async function (req, res) {
  const conversationId = req.params.id;
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  res.json({ status: true, data: conversation });
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

