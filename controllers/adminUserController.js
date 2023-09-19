const AdminUserModel = require('../models/AdminUserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

//post admin user sign up
const admin_signUp = async (req, res) => {
    console.log("in signup admin user request");
    console.log(req.body);
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
        console.log("something not filled");
        return res.status(404).json('Please fill all the input fields');
    }
    try {
        console.log("in try block");
        const preAdminUser = await AdminUserModel.findOne({ email: email });
        if (preAdminUser) {
            return res.status(404).json('Admin User already exists');
        } else {
            const saltRounds = 10;
            const newPassword = await bcrypt.hash(req.body.password, saltRounds);
            const addAdminUser = new AdminUserModel({ firstName, lastName, userName, email, password: newPassword, isAdmin: true });
            await addAdminUser.save();
            console.log("Added Admin User");
            return res.status(200).json(addAdminUser);
        }
    } catch (err) {
        console.log('Error while adding admin user');
        console.log(err);
        return res.status(404).json(err);
    };
};

//post admin user sign in
const admin_signIn = async (req, res) => {
    console.log("in signin admin user request");
    console.log(req.body);
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("something not filled");
        return res.status(400).json({ message: 'Please fill all the input fields' });
    }
    try {
        const trueUser = await AdminUserModel.findOne({
            email: req.body.email,
        })
        if (!trueUser) {
            return res.status(404).json({ message: "Invalid Admin User. Admin User not found." });
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            trueUser.password
        );
        if (isPasswordValid) {
            console.log("Password is valid");
            const token = jwt.sign(
                {
                    firstName: trueUser.firstName,
                    lastName: trueUser.lastName,
                    userName: trueUser.userName,
                    email: trueUser.email,
                    isAdmin: true,
                    isUser: false,
                },
                secretKey
            );
            return res
                .cookie("access_token", token)
                .status(200)
                .json({ "access_token": token, message: "Admin User signed in successfully" });
        } else {
            return res.status(404).json("Password is invalid");
        }
    } catch (err) {
        console.log("Error while signing in user");
        console.log(err);
        return res.status(404).json("Catch error while signing in Admin user");
    };
};

//get all users
const admin_getAllUsers = async (req, res) => {
    console.log("in get all user request");
    try {
        const userData = await UserModel.find();
        res.status(201).json(userData);
    } catch (err) {
        res.status(404).json(err);
        console.log(err);
    };
};

//get adminUser sign out
const admin_signOut = async (req, res) => {
    console.log("in signOut adminUser request");
    console.log("returning response with clearCookie, status and json");

    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
};

//delete user
const admin_deleteUser = async (req, res) => {
    console.log("in delete user request");
    try {
        const id = req.params.id;
        const deleteUser = await UserModel.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteUser);
    } catch (err) {
        res.status(404).json(err);
    };
};

//get user profile
const admin_profile = async (req, res) => {
    console.log("in profile admin request");
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";

    const token = req.body.token;
    console.log("Token if found: " + token);
    if (!token) {
        console.log("no token found");
        return res.status(400).json({ message: "Please Sign In to continue." });
    } else {
        const data = jwt.verify(token, secretKey);
        console.log("data:");
        console.log(data);
        const trueAdminUser = await AdminUserModel.findOne({
            email: data.email,
            isAdmin: data.isAdmin,
        });
        if (!trueAdminUser) {
            return res.status(404).json({ message: "Invalid Admin User. User not found." });
        }else{
            return res.status(200).json(trueAdminUser);
        }
    }
    // try {
    //    // console.log("in try");
    //     res.status(201).json({firstName:'', lastName:'', userName:'', email:''});
    // } catch (err) {
    //    // console.log("error");
    //    // console.log(err);
    //     res.status(404).json(err);
    // };
};
module.exports = {
    admin_signUp,
    admin_signIn,
    admin_getAllUsers,
    admin_deleteUser,
    admin_signOut,
    admin_profile,
};