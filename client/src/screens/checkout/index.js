import './style.scss'
import React, { useEffect, useState } from 'react'
import CheckoutItem from '../../components/checkoutItem';
import { Link } from 'react-router-dom';
import { Button, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
const jwt = require('jsonwebtoken');

function sum(products) {
    var total = 0;
    for (var idx = 0; idx < products.length; idx++) {
        total = total + products[idx].price * products[idx].quantity;
    }
    return total;
}
const Main = () => {
    const [cartData, setCartData] = useState([]);
    const [checkoutUser, setCheckoutUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        paymentMethod: "",
        couponCode: "",
    });
    // 62dbeb68ada4affd93e2090d
    // 62dbeb68ada4affd93e2090d
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setCheckoutUser({
            ...checkoutUser,
            [name]: value
        })
    }
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
                setCheckoutUser(userTokenDetails);
                const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/getUserCart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: userTokenDetails.id,
                    })
                })
                try {
                    // console.log("After fetching")
                    const data = await res.json();
                    if (res.status === 404 || !data) {
                        // console.log("error 404: while adding data ");
                        alert(`Error in fetching cart from database`);
                    } else if (data.cart.length == 0) {
                        // console.log("data")
                        // console.log(data)
                        alert('Kindly fill your cart with some products before checking out.');
                        window.location.href = '/cart';
                    } else {
                        // console.log("data")
                        // console.log(data)
                        setCartData(data.cart);
                        // alert(data.message);
                        // window.location.href = '/cart';
                    }
                }
                catch (err) {
                    // console.log(err)
                }
            }
        }
    }, [])

    const placeOrderCheckout = async () => {
        // console.log(checkoutUser)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkoutDetails: checkoutUser,
                cartItems: cartData,
            })
        })
        const data = await response.json()
        // console.log(data.message)
        if (response.status !== 200) {
            alert(data.message)
            window.location.href = '/checkout'
        } else {
            // console.log("200 status")
            // console.log("id")
            // console.log(checkoutUser.id);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/emptyCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: checkoutUser.id,
                })
            })
            const data = await response.json()
            // console.log(data)
        }
    }

    return (
        <>
            <section className='checkout_page'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Checkout</h1>
                    </div>
                </div>
                <div className='checkout_whole'>
                    <div className='checkout_left'>
                        <div className='btn_col'>
                            <Link className='back_button' to='/'>
                                <Button variant="contained">Explore Shop</Button>
                            </Link>
                            <br />
                            <br />
                            <Link className='update_button' to='/cart'>
                                <Button variant="contained">Cart</Button>
                            </Link>
                            <br />
                            <br />
                            <Link className='cart_button' to='/checkout'>
                                <Button disabled variant="contained">Checkout</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="checkout_center">
                        <div className='checkout_header'>
                            <h3>Billing Details</h3>
                        </div>
                        <form>
                            <div className='row'>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        type='text'
                                        name='userName'
                                        value={checkoutUser.userName}
                                        onChange={onChangeHandler}
                                        required
                                        id="filled-required"
                                        label="Username"
                                        variant="filled"
                                        disabled
                                    />
                                </div>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        type='email'
                                        name='email'
                                        value={checkoutUser.email}
                                        onChange={onChangeHandler}
                                        required
                                        id="filled-required"
                                        label="Email"
                                        variant="filled"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        required
                                        type='text'
                                        id="filled-required"
                                        name="firstName"
                                        label="First Name"
                                        value={checkoutUser.firstName}
                                        onChange={onChangeHandler}
                                        variant="filled"
                                    />
                                </div>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        type='text'
                                        name='lastName'
                                        value={checkoutUser.lastName}
                                        onChange={onChangeHandler}
                                        required
                                        id="filled-required"
                                        label="Last name"
                                        variant="filled"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-multiline-flexible"
                                        multiline
                                        maxRows={4}
                                        variant="filled"
                                        required
                                        type='textarea'
                                        name='address'
                                        value={checkoutUser.address}
                                        onChange={onChangeHandler}
                                        label="Address"
                                    />
                                </div>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-number"
                                        label="Zip-Code"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        name='zipCode'
                                        value={checkoutUser.zipCode}
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-select-currency"
                                        select
                                        label="Country"
                                        helperText="Please select your country"
                                        variant="filled"
                                        name='country'
                                        value={checkoutUser.country}
                                        onChange={onChangeHandler}
                                        required
                                    >
                                        <MenuItem key={1} value='california'>
                                            America
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-select-currency"
                                        select
                                        label="State"
                                        helperText="Please select your state"
                                        variant="filled"
                                        name='state'
                                        value={checkoutUser.state}
                                        onChange={onChangeHandler}
                                        required
                                    >
                                        <MenuItem key={1} value='california'>
                                            California
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-select-currency"
                                        select
                                        label="City"
                                        helperText="Please select your city"
                                        variant="filled"
                                        name='city'
                                        value={checkoutUser.city}
                                        onChange={onChangeHandler}
                                        required
                                    >
                                        <MenuItem key={1} value='california'>
                                            California
                                        </MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className='checkout_header'>
                                <h3>Payment Method</h3>
                            </div>
                            <div className='checkout_payment_method'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    onChange={onChangeHandler}
                                >
                                    <FormControlLabel name='paymentMethod' value="Credit card" control={<Radio />} label="Credit card" required />
                                    <FormControlLabel name='paymentMethod' value="Debit card" control={<Radio />} label="Debit card" required />
                                    <FormControlLabel name='paymentMethod' value="Cash On Delivery" control={<Radio />} label="Cash On Delivery" required />
                                    <FormControlLabel name='paymentMethod' value="Paypal" control={<Radio />} label="Paypal" required />
                                    <FormControlLabel name='paymentMethod' value="UPI" control={<Radio />} label="UPI" required />
                                </RadioGroup>
                                <div className='checkout_form_info'>
                                    <TextField
                                        className='checkout_textfield'
                                        id="filled-required"
                                        label="Coupon Code"
                                        variant="filled"
                                        type='text'
                                        name="couponCode"
                                        value={checkoutUser.couponCode}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='checkout_right'>
                        <div className='checkout_header'>
                            <br />
                            <h4>Your cart [ {cartData.length} ]</h4>
                        </div>
                        <div className='checkout_cart'>
                            {
                                cartData.map((prod, key) => (
                                    <div className='checkout_cart_item' key={key}><CheckoutItem {...prod}></CheckoutItem></div>
                                ))
                            }
                        </div>
                        <div className='checkout_header1'>
                            <h3>Totals</h3>
                        </div>
                        <div className='checkout_totals'>
                            <div className='amount_section'>
                                <h5>Subtotal: ${Math.round(sum(cartData) * 100) / 100}</h5>
                            </div>
                            <div className='tax_section'>
                                <p>
                                    CGST(9%): ${Math.round((sum(cartData) * 0.09) * 100) / 100}
                                    <br />
                                    SGST(9%): ${Math.round((sum(cartData) * 0.09) * 100) / 100}
                                </p>
                            </div>
                            <div className='amount_section'>
                                <h5>Total: <label> ${Math.round((sum(cartData) + sum(cartData) * 0.18) * 100) / 100}</label> </h5>
                            </div>
                            <hr />
                        </div>
                        <div className='checkout_form_info'>
                            <Link to="/orderHistory">
                                <Button className='checkout_continue_button' onClick={placeOrderCheckout} type='submit' variant="contained">Pay & Place Order</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
Main.displayName = 'Checkout'
export default Main;