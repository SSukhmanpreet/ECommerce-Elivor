import './style.scss'
import React, { useEffect, useState } from 'react'
import CartItem from '../../components/cartItem';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
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
    const [currentToken, setCurrentToken] = useState();
    const fxn = async () => {
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const givingToken = localStorage.getItem('token');

        const userTokenDetails = jwt.verify(givingToken, secretKey);
        // console.log(userTokenDetails)
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
                // console.log("Error in fetching cart from database");
                alert(`Error in fetching cart from database`);
            } else if (data.cart.length == 0) {
                alert('Explore the shop and add products to the cart.')
                window.location.href = '/';
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
    useEffect(async () => {
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    if (localStorage.getItem('token') === "undefined") {
            alert("Please Sign In to continue")
            window.location.href = '/signIn'
        }
        else {
            const givingToken = localStorage.getItem('token');
            // console.log("givingToken init")
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
            // console.log("givingToken")
            // console.log(givingToken)
            setCurrentToken(givingToken);
            const data = await response.json()
            // console.log(data.message)
            if (response.status !== 200) {
                alert(data.message)
                window.location.href = '/signIn'
            }
            else {
                // console.log("in else")

                const userTokenDetails = jwt.verify(givingToken, secretKey);
                // console.log(userTokenDetails)

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
                        // console.log("Error in fetching cart from database");
                        alert(data.message);
                        window.location.href = '/'
                    } else if (data.cart.length == 0) {
                        alert('Explore the shop and add products to the cart.')
                        window.location.href = '/';
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
    return (
        <>
            <section className='cart_page'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Shopping Cart</h1>
                    </div>
                </div>
                <div className='cart_whole'>
                    <div className='cart_left'>
                        <div className='btn_col'>
                            <Link className='back_button' to='/'>
                                <Button variant="contained">Explore Shop</Button>
                            </Link>
                            <br />
                            <br />
                            <Link className='update_button' to='/cart'>
                                <Button disabled variant="contained">Cart</Button>
                            </Link>
                            <br />
                            <br />
                            <Link className='cart_button' to='/checkout'>
                                <Button variant="contained">Checkout</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="cart_center">
                        <div className='cart_header'>
                            <h1>Cart Items</h1>
                        </div>
                        <table className="table">
                            <thead className="table_head">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((prod, key) => {
                                        return (
                                            <tr className='table_row' key={prod._id}>
                                                <CartItem {...prod} fxn={fxn} currentToken={currentToken}></CartItem>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='cart_right'>
                        <div className='cart_header'>
                            <br />
                            <h3>Totals</h3>
                        </div>
                        <div className='cart_totals'>
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
                            <div className='btn_col'>
                                {/* <Link className='update_button' to='/cart'>
                                    <Button variant="contained">Update Cart</Button>
                                </Link>
                                <br />
                                <br /> */}
                                <Link className='cart_button' to='/checkout'>
                                    <Button variant="contained">Checkout</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'Cart'
//Pre process the container with Redux Plugins
export default Main;