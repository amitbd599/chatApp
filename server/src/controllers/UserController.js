const {
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
} = require('../service.js/UserService');

//! User Control
exports.RegisterUser = async (req, res) => {
  let result = await RegisterUserService(req);
  return res.status(200).json(result);
};
exports.LoginUser = async (req, res) => {
  let result = await LoginUserService(req, res);
  return res.status(200).json(result);
};
exports.LogoutUser = async (req, res) => {
  let result = await LogoutUserService(res);
  return res.status(200).json(result);
};
exports.UserRead = async (req, res) => {
  let result = await UserReadService(req);
  return res.status(200).json(result);
};
exports.UserReadByID = async (req, res) => {
  let result = await UserReadByIDService(req);
  return res.status(200).json(result);
};
exports.UserAllRead = async (req, res) => {
  let result = await UserAllReadService(req);
  return res.status(200).json(result);
};
exports.UserUpdate = async (req, res) => {
  let result = await UserUpdateService(req);
  return res.status(200).json(result);
};
exports.RecoverVerifyEmailUser = async (req, res) => {
  let result = await RecoverVerifyEmailUserService(req);
  return res.status(200).json(result);
};
exports.RecoverVerifyOTPUser = async (req, res) => {
  let result = await RecoverVerifyOTPUserService(req);
  return res.status(200).json(result);
};
exports.ResetPasswordUser = async (req, res) => {
  let result = await ResetPasswordUserService(req);
  return res.status(200).json(result);
};

exports.EmailVerifyData = async (req, res) => {
  let result = await EmailVerifyDataService();
  return res.status(200).json(result);
};
