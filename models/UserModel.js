const mongoose = require('mongoose');

//creating schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isUser: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

//creating model
const UserModel = new mongoose.model('users', UserSchema);

module.exports = UserModel;