const mongoose = require('mongoose');
const validator = require('validator');
const DataSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNo: { type: String },
    img: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = mongoose.model('users', DataSchema);

module.exports = UserModel;
