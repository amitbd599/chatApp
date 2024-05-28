const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    senderID: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverID: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const ChatModel = mongoose.model('Chats', DataSchema);
module.exports = ChatModel;
