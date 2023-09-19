const mongoose = require("mongoose");

//creating schema
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

//creating model
const ProductModel = new mongoose.model("products", ProductSchema);

module.exports = ProductModel;