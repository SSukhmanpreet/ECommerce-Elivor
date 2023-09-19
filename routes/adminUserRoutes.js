const express = require('express');
const adminController = require('../controllers/adminUserController');

const adminUserRouter = express.Router();

adminUserRouter.post('/signUp', adminController.admin_signUp);
adminUserRouter.post('/signIn', adminController.admin_signIn);
adminUserRouter.get("/getAllUsers", adminController.admin_getAllUsers);
adminUserRouter.get("/signOut", adminController.admin_signOut);
adminUserRouter.delete("/deleteUser/:id", adminController.admin_deleteUser);
adminUserRouter.post("/profile", adminController.admin_profile);

module.exports = adminUserRouter;