const express = require('express')
const multer = require('multer');
const productController = require('../controllers/productController');

const productRouter = express.Router();

//assigning storage to store images uploaded by user
const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: Storage,
});

productRouter.post('/addProduct', upload.single('image'), productController.product_addProduct);
productRouter.get("/getAllProduct", productController.product_getAllProduct);
productRouter.get("/getProduct/:id", productController.product_getProductById);
productRouter.get("/getProductByCategory/:cat", productController.product_getProductByCategory);
productRouter.patch("/updateProduct/:id", upload.single('image'), productController.product_updateProduct);
productRouter.delete("/deleteAllProduct", productController.product_deleteAllProduct);
productRouter.delete("/deleteProduct/:id", productController.product_deleteIndProduct);

module.exports = productRouter;