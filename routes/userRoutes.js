const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signUp', userController.user_signUp);
userRouter.post('/signIn', userController.user_signIn);
userRouter.get("/signOut", userController.user_signOut);
userRouter.post("/profile", userController.user_profile);

module.exports = userRouter;