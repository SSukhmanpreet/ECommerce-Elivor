const mongoose = require("mongoose");

//creating schema
const CategorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

//creating model
const CategoryModel = new mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;