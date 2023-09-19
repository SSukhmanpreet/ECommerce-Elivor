const mongoose = require('mongoose');

//creating schema
const OrderHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        ordersList: [
            {
                orderNumber: {
                    type: String,
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
                ],
                userDetails: {
                    firstName: {
                        type: String,
                        required: true,
                    },
                    lastName: {
                        type: String,
                        required: true,
                    },
                    userName: {
                        type: String,
                        required: true,
                    },
                    email: {
                        type: String,
                        required: true,
                    },

                },
                addressDetails: {
                    address: {
                        type: String,
                        required: true,
                    },
                    country: {
                        type: String,
                        required: true,
                    },
                    state: {
                        type: String,
                        required: true,
                    },
                    city: {
                        type: String,
                        required: true,
                    },
                    zipCode: {
                        type: String,
                        required: true,
                    },
                },
                paymentDetails: {
                    paymentMethod: {
                        type: String,
                    },
                    couponCode: {
                        type: String,
                    },
                }
            },
        ],

    },
    {
        timestamps: true,
    }
)
//creating model
const OrderHistoryModel = new mongoose.model("orderHistory", OrderHistorySchema);

module.exports = OrderHistoryModel;