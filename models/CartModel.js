const mongoose = require('mongoose');

//creating schema
const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,

                }
            }
        ]
    },
    {
        timestamps: true,
    }
)
//creating model
const CartModel = new mongoose.model("userCart", CartSchema);

module.exports = CartModel;