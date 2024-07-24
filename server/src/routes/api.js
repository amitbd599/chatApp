const express = require('express');
const UserController = require('../controllers/UserController');
const ChatController = require('../controllers/ChatController');
const AuthVerification = require('../middlewares/AuthVerification');
const router = express.Router();

router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.get('/logout', UserController.LogoutUser);
router.get('/read-user', AuthVerification, UserController.UserRead);
router.get('/read-user-by/:id', AuthVerification, UserController.UserReadByID);
router.get('/read-all-user', AuthVerification, UserController.UserAllRead);
router.post('/user-update', AuthVerification, UserController.UserUpdate);
router.post('/forgot-password/:email', UserController.RecoverVerifyEmailUser);
router.post('/otp-verify/:email/:otp', UserController.RecoverVerifyOTPUser);
router.post('/reset-password/:email/:otp', UserController.ResetPasswordUser);
router.get("/verify", AuthVerification, UserController.EmailVerifyData);
// Chat routes
router.post('/create-chat', AuthVerification, ChatController.CreateChat);
router.post(
  '/read-sender-chat',
  AuthVerification,
  ChatController.ReadSenderChat,
);
router.post(
  '/read-receiver-chat',
  AuthVerification,
  ChatController.ReadReceiverChat,
);



module.exports = router;
