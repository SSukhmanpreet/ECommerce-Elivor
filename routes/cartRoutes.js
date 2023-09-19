const express = require('express');
const cartController = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/addProductToCart', cartController.cart_addProductToCart);
cartRouter.post('/getUserCart', cartController.cart_getUserCart);
cartRouter.delete('/deleteProductFromCart', cartController.cart_deleteProductFromCart);
cartRouter.post('/getProductInfo', cartController.cart_getProductInfo);
cartRouter.post('/checkout', cartController.cart_checkout);
cartRouter.post('/getOrderHistory', cartController.cart_orderHistory);
cartRouter.post('/emptyCart', cartController.cart_emptyCart);

module.exports = cartRouter;