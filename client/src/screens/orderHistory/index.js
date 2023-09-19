import './style.scss';
import React, { useState, useEffect } from 'react';
import PaginationComponent from '../../components/paginationComponent';
import CustomizedSteppers from '../../components/orderCompletion';
import OrderHistoryComponent from '../../components/orderHistoryComponent'
const jwt = require('jsonwebtoken');

const Main = () => {
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    useEffect(async () => {
        // console.log('in useeffect')
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    if (localStorage.getItem('token') === "undefined") {
            alert("Please Sign In to continue")
            window.location.href = '/signIn'
        }
        else {
            const givingToken = localStorage.getItem('token');
            // console.log(givingToken)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: givingToken,
                })
            })
            const data = await response.json()
            // console.log(data.message)
            if (response.status !== 200) {
                alert(data.message)
                window.location.href = '/signIn'
            } else {
                // console.log("in else token authenticated")
                const userTokenDetails = jwt.verify(givingToken, secretKey);
                // console.log("userTokenDetails")
                // console.log(userTokenDetails)
                const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/getOrderHistory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: userTokenDetails.id,
                    })
                })
                // console.log("After fetching")
                const data = await res.json();
                if (res.status === 404 || !data) {
                    // console.log("error 404: while adding data ");
                    alert(data.message);
                    window.location.href = '/';
                } else {
                    // console.log("data")
                    // console.log(data)
                    // if (data.ordersList == null || data.ordersList == "null") {
                    //     alert("No orders yet.");
                    //     window.location.href = '/'
                    // }
                    setOrderHistoryData(data.ordersList);
                }
            }
        }
    }, []);
    const totalAmount = (arr) => {
        var total = 0;
        arr.map((prod) => {
            total = total + (prod.quantity * prod.price)
            return total;
    })
    return total;
}

return (
    <>

        <section className='allOrders_page'>
            <div className='heading_container1'>
                <h3>
                    Order History
                </h3>
            </div>
            <div className='heading_container2'>
                <h4>
                    All Orders
                </h4>
            </div>
            <div className='ordersList'>
                {

                    orderHistoryData.map((order, id) => {
                        var myArray = order.cartItems;
                        return (
                            <div key={id} className='indv_order'>
                                <div className='order_status'>
                                    <h2>Order Number:  #{order.orderNumber}</h2>
                                    <CustomizedSteppers />
                                </div>
                                <div className='order_orderDetails'>
                                    <div className='order_items'><OrderHistoryComponent props={myArray} /></div>
                                    <div className='order_total'> <h6>Total Amount: </h6> <strong>${totalAmount(order.cartItems)}</strong></div>
                                </div>
                                <div className='order_otherDetails'>
                                    <div className='order_userDetails'>
                                        <h4>User Details: </h4>
                                        Full name: <strong> {order.userDetails.firstName} {order.userDetails.lastName} </strong><br />
                                        Username: <strong>{order.userDetails.userName}</strong> <br />
                                        Email: <strong>{order.userDetails.email}</strong> <br />
                                    </div>
                                    <div className='order_addressDetails'>
                                        <h4>Address Details: </h4>
                                        Address: <strong> {order.addressDetails.address}.</strong> <br />
                                        <strong>{order.addressDetails.country}, {order.addressDetails.state}, {order.addressDetails.city}, {order.addressDetails.zipCode}</strong> <br />
                                    </div>
                                    <div className='order_paymentDetails'>
                                        <h4>Payment Details: </h4>
                                        Payment Method: <strong> {order.paymentDetails.paymentMethod}</strong> <br />
                                        Coupon code used: <strong>{order.paymentDetails.couponCode} </strong><br />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
        <PaginationComponent />
    </>
);
}

Main.displayName = 'OrderHistory'
//Pre process the container with Redux Plugins
export default Main