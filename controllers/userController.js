const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//post user sign up
const user_signUp = async (req, res) => {
    console.log("in signUp user request");
    console.log("reqBody: " + req.body);
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
        console.log("something not filled");
        return res.status(404).json('Please fill all the input fields');
    }
    try {
        console.log("in try block");
        const preUser = await UserModel.findOne({ email: email });
        if (preUser) {
            return res.status(404).json('User already exists');
        } else {
            const saltRounds = 10;
            const newPassword = await bcrypt.hash(req.body.password, saltRounds);
            const addUser = new UserModel({ firstName, lastName, userName, email, password: newPassword, isUser: true });
            await addUser.save();
            console.log("Added User");
            return res.status(200).json(addUser);
        }
    } catch (err) {
        console.log('Error while adding user');
        console.log(err);
        return res.status(404).json(err);
    };
};

//post user sign in
const user_signIn = async (req, res) => {
    console.log("in signin user request");
    console.log(req.body);
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("something not filled");
        return res.status(400).json({ message: 'Please fill all the input fields' });
    }
    try {
        const trueUser = await UserModel.findOne({
            email: req.body.email,
        });
        if (!trueUser) {
            return res.status(404).json({ message: "Invalid User. User not found." });
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
                    id: trueUser._id,
                    isUser: true,
                    isAdmin: false,
                },
                secretKey
            );
            return res
                .cookie("access_token", token)
                .status(200)
                .json({ "access_token": token, message: "Signed in successfully" });
        } else {
            return res.status(404).json("Password is invalid");
        }
    } catch (err) {
        console.log("Error while signing in user");
        console.log(err);
        return res.status(404).json("Catch error while signing in user");
    };
};

//get user sign out
const user_signOut = async (req, res) => {
    console.log("in signOut user request");
    console.log("returning response with clearCookie, status and json");

    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
};

//not yet
//get user profile
const user_profile = async (req, res) => {
    console.log("in profile user request");
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
        const trueUser = await UserModel.findOne({
            email: data.email,
            isUser: data.isUser,
        });
        if (!trueUser) {
            return res.status(404).json({ message: "Invalid User. User not found." });
        }else{
            return res.status(200).json(trueUser);
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
    user_signUp,
    user_signIn,
    user_signOut,
    user_profile,
};