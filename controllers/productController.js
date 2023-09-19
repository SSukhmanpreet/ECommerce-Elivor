const ProductModel = require("../models/ProductModel");

//add product
const product_addProduct = async (req, res) => {
    console.log("in add product request");
    console.log("req body:: ");
    console.log(req.body);
    console.log("req file:: ");
    console.log(req.file);

    const { title, price, stock, description, categoryName } = req.body;
    const image = req.file.originalname;
    // const image2 = req.file.originalname;
    if (!image) {
        return res.status(400).json('Please upload image.');
    }
    if (!title || !price || !stock || !description || !categoryName || !image) {
        return res.status(404).json('Please fill all the input fields');
    }
    try {
        const preProd = await ProductModel.findOne({ title: title });
        if (preProd) {
            return res.status(404).json('Product with this title already exists');
        } else {
            const addProd = new ProductModel({ title, price, stock, description, categoryName, image });
            await addProd.save();
            console.log("Uploaded data to the database");
            return res.status(200).json(addProd);
        }
    } catch (err) {
        console.log('error while adding product');
        console.log(err);
        return res.status(404).json(err);
    };
};

//get product - all
const product_getAllProduct = async (req, res) => {
    console.log("in get all product request");
    const resPerPage= 8;
    const productsCount = await ProductModel.countDocuments();
    try {
        console.log("inside try router");
        const productData = await ProductModel.find();
        return res.status(201).json(productData);
    } catch (err) {
        console.log("error while getting all product");
        console.log(err);
        res.status(404).json(err);
    };
};

//get product - individual
const product_getProductById = async (req, res) => {
    console.log("in get individual product request");
    console.log(req.body)
    console.log(req.params.id);
    try {
        const id = req.params.id;
        console.log("trying: " + id);
        const individualProd = await ProductModel.findById({ _id: id });
        console.log(individualProd);
        res.status(201).json(individualProd);
    } catch (err) {
        console.log("error while getting individual product");
        console.log(err);
        res.status(404).json(err);
    };
};
const product_getProductByCategory = async (req, res)=>{
    console.log("in get product by category request");
    console.log(req.body)
    console.log(req.params.cat);
    try {
        const cat = req.params.cat;
        console.log("trying: " + cat);
        const individualProd = await ProductModel.find({ categoryName: cat });
        console.log(individualProd);
        res.status(201).json(individualProd);
    } catch (err) {
        console.log("error while getting product by category");
        console.log(err);
        res.status(404).json(err);
    };
}
//update product
const product_updateProduct = async (req, res) => {
    console.log("in update Product request");
    console.log("req body:: ");
    console.log(req.body);
    console.log("req file:: ");
    console.log(req.file);
    try {
        const id = req.params.id;
        const { title, price, stock, description, categoryName } = req.body;
        const image = req.file.originalname;
        const updatedCat = await ProductModel.findByIdAndUpdate(id, { title, price, stock, description, categoryName, image }, {
            new: true
        });
        console.log("updatedCat")
        console.log(updatedCat)
        res.status(201).json(updatedCat);

    } catch (err) {
        console.log("error while updating Product");
        console.log(err);
        res.status(404).json(err);
    };
};
//not-yet
//delete product - all
const product_deleteAllProduct = async (req, res) => {
    console.log("in delete all product request");
    try {
        const deleteProd = await UserModel.deleteMany({});
        res.status(201).json(deleteProd);
    } catch (err) {
        console.log("error while deleting all product");
        console.log(err);
        res.status(404).json(err);
    };
};

//not-yet
//delete Product - individual
const product_deleteIndProduct = async (req, res) => {
    console.log("in delete individual Product request");
    try {
        const id = req.params.id;
        const deleteCat = await ProductModel.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteCat);
    } catch (err) {
        console.log("error while deleting individual Product");
        console.log(err);
        res.status(404).json(err);
    };
};

module.exports = {
    product_addProduct,
    product_getAllProduct,
    product_getProductById,
    product_deleteAllProduct,
    product_deleteIndProduct,
    product_updateProduct,
    product_getProductByCategory,
};