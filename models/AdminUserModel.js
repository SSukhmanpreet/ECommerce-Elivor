const mongoose = require('mongoose');

//creating schema
const AdminUserSchema = new mongoose.Schema(
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
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

//creating model
const AdminUserModel = new mongoose.model('adminusers', AdminUserSchema);

module.exports = AdminUserModel;