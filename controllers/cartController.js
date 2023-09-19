const jwt = require('jsonwebtoken');
const CartModel = require('../models/CartModel');
const ProductModel = require("../models/ProductModel");
const OrderHistoryModel = require('../models/OrderHistoryModel');

//post add product to cart
const cart_addProductToCart = async (req, res) => {
    console.log("in post user cart request");
    console.log(req.body);
    const chkuser = await CartModel.findOne({ user: req.body.user });
    if (chkuser) {
        //if user exists
        console.log("chkuser exists");
        console.log(chkuser);
        const chkproduct = chkuser.cartItems.find(item => item.product == req.body.cartItems.product);
        console.log("chkproduct");
        console.log(chkproduct);
        if (chkproduct) {
            console.log("chkproduct is valid");
            await CartModel.findOneAndUpdate({ 'user': req.body.user, 'cartItems.product': req.body.cartItems.product }, {
                $set: {
                    'cartItems.$': {
                        ...req.body.cartItems,
                        quantity: chkproduct.quantity + req.body.cartItems.quantity
                    }
                }
            });
            return res.status(200).json({ message: "product already exists. added to quantity" });
        } else {
            await CartModel.findOneAndUpdate({ 'user': req.body.user }, {
                $push: {
                    cartItems: req.body.cartItems
                }
            });
            return res.status(200).json({ message: "user already exists. added to array of cart" });
        }
    } else {
        //if user does not exist 
        console.log("user does not exist");
        const cart = new CartModel({
            user: req.body.user,
            cartItems: [req.body.cartItems]
        });
        console.log("cart");
        console.log(cart);
        cart.save((err, cart) => {
            console.log("in save");
            if (err) {
                console.log("in error");
                console.log(err);
                console.log(cart);
                res.status(400).json({ error: err, message: "error" });
            }
            if (cart) {
                console.log("in cart");
                console.log(cart);
                return res.status(200).json({ cart, message: "Added cart with user to cart collection" })
            }
        });
    }
};

//returning user cart based on user id
const cart_getUserCart = async (req, res) => {
    console.log("in get user cart request");
    console.log(req.body);
    const chkuser = await CartModel.findOne({ user: req.body.user });
    console.log("chkuser");
    console.log(chkuser);
    if (chkuser) {
        if (!chkuser.cartItems) {
            return res.status(404).json({ message: "User found but cart is empty" });
        }
        return res.status(200).json({ cart: chkuser.cartItems, message: "User found with cart items" });
    } else {
        return res.status(404).json({ message: "User doesn't have anything in cart yet." });
    }
};

//decrease quantity of product from cart for user
const cart_deleteProductFromCart = async (req, res) => {
    console.log("in delete user cart product request");
    console.log(req.body);
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const userTokenDetails = jwt.verify(req.body.currentToken, secretKey);
    console.log('userTokenDetails');
    console.log(userTokenDetails);
    const chkuser = await CartModel.findOne({ user: userTokenDetails.id });
    console.log("chkuser");
    console.log(chkuser);
    const chkproduct = chkuser.cartItems.find(item => item.product == req.body.prdctID);
    console.log("chkproduct");
    console.log(chkproduct);
    if (chkproduct.quantity > 1) {
        console.log("chkproduct quant >1");
        console.log(...chkuser.cartItems);
        await CartModel.findOneAndUpdate({ 'user': userTokenDetails.id, 'cartItems.product': req.body.prdctID }, {
            $set: {
                'cartItems.$': {
                    ...chkuser.cartItems,
                    product: chkproduct.product,
                    price: chkproduct.price,
                    quantity: chkproduct.quantity - 1
                }
            }
        });
        console.log("done quant>1");
        return res.status(200).json({ quant: chkproduct.quantity - 1, message: "quantity reduced" });
    }
    else {
        console.log("chkproduct quant <=1");
        console.log(chkproduct.quantity);
        console.log("userTokenDetails.id");
        console.log(userTokenDetails.id);
        console.log("chkuser.cartItems");
        console.log(chkuser.cartItems);

        const pulledItem = await CartModel.findOneAndUpdate({ 'user': userTokenDetails.id, 'cartItems.product': req.body.prdctID }, {
            $pull: {
                'cartItems': {
                    'product': req.body.prdctID
                }
            }
        });
        console.log("pulledItem");
        console.log(pulledItem);
        console.log("done quant <=1");
        return res.status(200).json({ message: "product deleted" });
    }
};

//returning product details based on product ID 
const cart_getProductInfo = async (req, res) => {
    console.log("in get product info request");
    console.log(req.body);
    const chkProduct = await ProductModel.findOne({ _id: req.body.prdctID });
    console.log("chkProduct");
    console.log(chkProduct);
    if (chkProduct) {
        return res.status(200).json({ prdctInfo: chkProduct, message: "Product found in model" });
    } else {
        return res.status(404).json({ message: "Product not found in model" });
    }
};

const cart_checkout = async (req, res) => {
    console.log("in cart checkout");
    console.log(req.body);
    const { id, firstName, lastName, userName, email, address, country, state, city, zipCode, paymentMethod, couponCode } = req.body.checkoutDetails;
    const cartItems = req.body.cartItems;
    console.log("id")
    console.log(id)
    // if (!firstName || !lastName || !userName || !email || !address || !country || !state || !city || !zipCode || !paymentMethod) {
    //     return res.status(404).json({ message: 'Please fill all the input fields' });
    // }else{
    const chkuser = await OrderHistoryModel.findOne({ user: req.body.checkoutDetails.id });
    console.log(chkuser);
    if (chkuser) {
        await OrderHistoryModel.findOneAndUpdate({ 'user': req.body.checkoutDetails.id }, {
            $push: {
                ordersList: {
                    orderNumber: parseInt(chkuser.ordersList[chkuser.ordersList.length - 1].orderNumber) + parseInt(1),
                    cartItems: cartItems,
                    userDetails: { firstName: firstName, lastName: lastName, userName: userName, email: email },
                    addressDetails: { address, country, state, city, zipCode },
                    paymentDetails: { paymentMethod, couponCode },
                }
            }
        });
        return res.status(200).json({ message: "user already exists. added to array of cart" });
    } else {
        console.log("user does not exist");
        console.log("cart Items");
        console.log(cartItems);
        const orderHistory = new OrderHistoryModel({
            user: id,
            ordersList: [
                {
                    orderNumber: parseInt(1),
                    cartItems: cartItems,
                    userDetails: { firstName: firstName, lastName: lastName, userName: userName, email: email },
                    addressDetails: { address, country, state, city, zipCode },
                    paymentDetails: { paymentMethod, couponCode },

                }
            ]
        });
        console.log("orderHistory");
        console.log(orderHistory);
        orderHistory.save((err, orderHistory) => {
            console.log("in save");
            if (err) {
                console.log("in error");
                console.log(err);
                console.log(orderHistory);
                res.status(400).json({ error: err, message: "error" });
            }
            if (orderHistory) {
                console.log("in cart");
                console.log(orderHistory);
                return res.status(200).json({ orderHistory, message: "Added cart with user to cart collection" })
            }
        });
    }
};

const cart_orderHistory = async (req, res) => {
    console.log('in order history')
    console.log(req.body)
    const chkuser = await OrderHistoryModel.findOne({ user: req.body.user });
    console.log(chkuser);
    if (chkuser) {
        return res.status(200).json({ ordersList: chkuser.ordersList, message: "User found in cart model" });
    } else {
        return res.status(404).json({ordersList: null, message: "No orders done by this user yet." });
    }
};

const cart_emptyCart = async (req, res) => {
    console.log("in empty cart")
    console.log(req.body);
    await CartModel.findOneAndUpdate({ 'user': req.body.userID }, { $set: { 'cartItems': [] } }, { multi: true })
    // await CartModel.findOneAndUpdate({ 'user': req.body.userID }, { $set: { 'cartItems': [] } });
    return res.status(200).json("emptied cart");

}
module.exports = {
    cart_addProductToCart,
    cart_getUserCart,
    cart_deleteProductFromCart,
    cart_getProductInfo,
    cart_checkout,
    cart_orderHistory,
    cart_emptyCart,
};