const mongoose = require('mongoose');
const ChatModel = require('../models/ChatModel');
const ObjectId = mongoose.Types.ObjectId;

const CreateChatService = async (req) => {
  try {
    let reqBody = req.body;
    reqBody.senderID = new ObjectId(req.headers.user_id);
    reqBody.receiverID = new ObjectId(req.body.receiverID);
    let data = await ChatModel.create(reqBody);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const ReadSenderChatService = async (req) => {
  try {
    senderID = new ObjectId(req.headers.user_id);
    receiverID = new ObjectId(req.body.receiverID);
    let MatchStage = {
      $match: {
        senderID,
        receiverID,
      },
    };

    let data = await ChatModel.aggregate([MatchStage]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ReadReceiverChatService = async (req) => {
  try {
    receiverID = new ObjectId(req.headers.user_id);
    senderID = new ObjectId(req.body.senderID);
    let MatchStage = {
      $match: {
        senderID,
        receiverID,
      },
    };

    console.log(MatchStage);
    let data = await ChatModel.aggregate([MatchStage]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

module.exports = {
  CreateChatService,
  ReadSenderChatService,
  ReadReceiverChatService,
};
