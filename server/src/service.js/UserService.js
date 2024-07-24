const md5 = require('md5');
const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const OTPModel = require('../models/OTPModel');
const { EncodeToken } = require('../utility/TokenHelper');
const EmailSend = require('../utility/EmailHelper');
const ObjectId = mongoose.Types.ObjectId;
const RegisterUserService = async (req) => {
  try {
    let reqBody = req.body;
    reqBody.password = md5(req.body.password);
    let data = await UserModel.create(reqBody);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const LoginUserService = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.password = md5(req.body.password);
    let data = await UserModel.aggregate([
      { $match: reqBody },
      { $project: { password: 0 } },
    ]);

    if (data.length > 0) {
      let token = EncodeToken(data[0]); 

      let options = {
        maxAge: process.env.Cookie_Expire_Time,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      };

      // Set cookie
      res.cookie('token', token, options);
      return { status: true, token: token, data: data[0] };
    } else {
      return { status: 'unauthorized', data: data };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const LogoutUserService = async (res) => {
  try {
    res.clearCookie('token');
    return { status: true };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const UserReadService = async (req) => {
  let email = req.headers.email;
  try {
    let MatchStage = {
      $match: {
        email,
      },
    };

    let Project = {
      $project: {
        password: 0,
      },
    };
    let data = await UserModel.aggregate([MatchStage, Project]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const UserReadByIDService = async (req) => {
  let id = new ObjectId(req.params.id);
  try {
    let MatchStage = {
      $match: {
        _id: id,
      },
    };

    let Project = {
      $project: {
        password: 0,
      },
    };
    let data = await UserModel.aggregate([MatchStage, Project]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const UserAllReadService = async (req) => {
  try {
    let MatchStage = {
      $match: {},
    };

    let Project = {
      $project: {
        password: 0,
      },
    };
    let data = await UserModel.aggregate([MatchStage, Project]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const UserUpdateService = async (req) => {
  let reqBody = req.body;
  reqBody.email = req.headers.email;
  reqBody.password = md5(req.body.password);

  try {
    let data = await UserModel.updateOne(
      { email: reqBody.email },
      {
        $set: reqBody,
      },
    );

    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const RecoverVerifyEmailUserService = async (req) => {
  let email = req.params.email;
  let otp = Math.floor(100000 + Math.random() * 900000);

  try {
    // Email Account Query
    let UserCount = await UserModel.aggregate([
      { $match: { email: email } },
      { $count: 'total' },
    ]);

    if (UserCount.length > 0) {
      //Create OTP
      let CreateOTP = await OTPModel.updateOne(
        { email: email },
        {
          otp,
          status: 0,
        },
        { upsert: true, new: true },
      );
      // Send Email
      let SendEmail = await EmailSend(
        email,
        'Your PIN Code is =' + otp,
        'MERN Chat PIN Verification',
      );
      return { status: true, data: SendEmail };
    } else {
      return { status: false, data: 'No User Found' };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const RecoverVerifyOTPUserService = async (req) => {
  let email = req.params.email;
  let otp = req.params.otp;
  otp = parseInt(otp);
  try {
    let OTPCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 0 } },
      { $count: 'total' },
    ]);

    if (OTPCount.length > 0) {
      let OTPUpdate = await OTPModel.updateOne(
        {
          email,
          otp,
          status: 0,
        },
        {
          otp,
          status: 1,
        },
      );
      return { status: true, data: OTPUpdate };
    } else {
      return { status: false, data: 'Invalid OTP Code' };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const ResetPasswordUserService = async (req) => {
  let email = req.params.email;
  let otp = req.params.otp;
  otp = parseInt(otp);
  let reqBody = {
    email: email,
    password: md5(req.body.password),
  };
  try {
    let OTPUsedCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 1 } },
    ]);

    if (OTPUsedCount.length > 0) {
      let PassUpdate = await UserModel.updateOne(
        { email: email },
        {
          $set: reqBody,
        },
      );

      let updateOTP = await OTPModel.updateOne(
        { email: email },
        {
          $set: { email, otp: null, status: 0 },
        },
      );
      return { status: true, data: PassUpdate, updateOTP };
    } else {
      return { status: false, data: 'Something is Wrong!' };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const EmailVerifyDataService = async () => {
  try {
    return { status: true };
  } catch (e) {
    return { status: false, error: error.toString() };
  }
};

module.exports = {
  RegisterUserService,
  LoginUserService,
  LogoutUserService,
  UserReadService,
  UserUpdateService,
  RecoverVerifyEmailUserService,
  RecoverVerifyOTPUserService,
  ResetPasswordUserService,
  UserAllReadService,
  UserReadByIDService,
  EmailVerifyDataService,
};
