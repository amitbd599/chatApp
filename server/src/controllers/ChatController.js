const {  CreateChatService,  ReadSenderChatService, ReadReceiverChatService } = require('../service.js/ChatService');

exports.CreateChat = async (req, res) => {
  let result = await CreateChatService(req);
  return res.status(200).json(result);
};
exports.ReadSenderChat = async (req, res) => {
  let result = await ReadSenderChatService(req);
  return res.status(200).json(result);
};
exports.ReadReceiverChat = async (req, res) => {
  let result = await ReadReceiverChatService(req);
  return res.status(200).json(result);
};
