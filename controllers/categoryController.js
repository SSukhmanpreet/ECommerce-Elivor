const CategoryModel = require("../models/CategoryModel");

//add category
const category_addCategory = async (req, res) => {
    console.log("in add category request");
    const { categoryName } = req.body;
    if (!categoryName) {
        res.status(404).json('Please specify the category name you want to add.');
    }
    try {
        const preCat = await CategoryModel.findOne({ categoryName: categoryName });
        if (preCat) {
            res.status(404).json('Category with this name already exists.');
        } else {
            const addCat = new CategoryModel({ categoryName });
            await addCat.save();
            res.status(201).json(addCat);
        }
    } catch (err) {
        console.log('error while adding category');
        console.log(err);
        res.status(404).json(err);
    };
};

//get category - all
const category_getAllCategory = async (req, res) => {
    console.log("in get all category request");
    try {
        const categoryData = await CategoryModel.find();
        res.status(201).json(categoryData);
    } catch (err) {
        console.log("error while getting all category");
        console.log(err);
        res.status(404).json(err);
    };
};

//get category - individual
const category_getIndCategory = async (req, res) => {
    console.log("in get individual category request");
    try {
        const id = req.params.id;
        const individualCat = await CategoryModel.findById({ _id: id });
        res.status(201).json(individualCat);
    } catch (err) {
        console.log("error while getting individual category");
        console.log(err);
        res.status(404).json(err);
    };
};

//update category
const category_updateCategory = async (req, res) => {
    console.log("in update category request");
    try {
        const id = req.params.id;
        const updatedCat = await CategoryModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(201).json(updatedCat);

    } catch (err) {
        console.log("error while updating category");
        console.log(err);
        res.status(404).json(err);
    };
};

//not-yet
//delete category - all
const category_deleteCategory = async (req, res) => {
    console.log("in delete all category request");
    try {
        const deleteCat = await CategoryModel.deleteMany({});
        res.status(201).json(deleteCat);
    } catch (err) {
        console.log("error while deleting all category");
        console.log(err);
        res.status(404).json(err);
    };
};

//delete category - individual
const category_deleteIndCategory = async (req, res) => {
    console.log("in delete individual category request");
    try {
        const id = req.params.id;
        const deleteCat = await CategoryModel.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteCat);
    } catch (err) {
        console.log("error while deleting individual category");
        console.log(err);
        res.status(404).json(err);
    };
};

module.exports = {
    category_addCategory,
    category_getAllCategory,
    category_getIndCategory,
    category_updateCategory,
    category_deleteCategory,
    category_deleteIndCategory,
};