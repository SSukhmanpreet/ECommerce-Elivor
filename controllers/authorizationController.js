const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const AdminUserModel = require('../models/AdminUserModel');

//post auth normal user
const auth_user = async (req, res) => {
    console.log("in normal user authorization request");
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const token = req.body.token;
    console.log("Token if found: " + token);
    if (!token) {
        console.log("no token found");
        return res.status(400).json({ message: "Please Sign In to continue." });
    }
    try {
        console.log("verifying token");
        const data = jwt.verify(token, secretKey);
        console.log("data: " + data);
        const trueUser = await UserModel.findOne({
            email: data.email,
            isUser: data.isUser,
        });
        console.log("trueUser if found: " + trueUser);
        if (!trueUser) {
            console.log("user is invalid");
            return res.status(404).json({ message: "Invalid User. Please Sign In again." });
        } else {
            console.log("user is valid");
            return res.status(200).json({ message: "User already signed in." });
        }
    } catch (err) {
        console.log("Error while authenticating User");
        console.log(err);
        return res.status(403).json({ message: "Error while authenticating User." });
    };
};

//post auth admin user
const auth_adminUser = async (req, res) => {
    console.log("in admin user authorization request");
    console.log(req.body);
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const token = req.body.token;
    console.log("Token if found: " + token);
    if (!token) {
        console.log("no token found");
        return res.status(400).json({ message: "Please Sign In with ADMIN account to continue." });
    }
    try {
        console.log("verifying token");
        const data = jwt.verify(token, secretKey);
        console.log("data: " + data);
        const trueAdminUser = await AdminUserModel.findOne({
            email: data.email,
            isAdmin: data.isAdmin,
        });
        console.log("trueAdminUser: " + trueAdminUser);

        if (!trueAdminUser) {
            console.log("admin user is invalid");
            return res.status(404).json({ message: "This page is only accessible to ADMIN User. Please Sign In with ADMIN account." });
        } else {
            console.log("admin user is valid");
            return res.status(200).json({ message: "Admin User already signed in." });
        }
    } catch (err) {
        console.log("error while authenticating Admin User");
        console.log(err);
        return res.status(403).json({ error: err, message: "Error while authenticating Admin User." });
    };
};

module.exports = {
    auth_user,
    auth_adminUser,
};