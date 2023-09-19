const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/addCategory', categoryController.category_addCategory);
categoryRouter.get("/getAllCategory", categoryController.category_getAllCategory);
categoryRouter.get("/getCategory/:id", categoryController.category_getIndCategory);
categoryRouter.patch("/updateCategory/:id", categoryController.category_updateCategory);
categoryRouter.delete("/deleteAllCategory", categoryController.category_deleteCategory);
categoryRouter.delete("/deleteCategory/:id", categoryController.category_deleteIndCategory);

module.exports = categoryRouter;