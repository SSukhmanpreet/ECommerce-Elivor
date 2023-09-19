const express = require('express');
const authorizationController = require('../controllers/authorizationController');

const authRouter = express.Router();

authRouter.post("/user", authorizationController.auth_user);
authRouter.post("/admin", authorizationController.auth_adminUser);

module.exports = authRouter;