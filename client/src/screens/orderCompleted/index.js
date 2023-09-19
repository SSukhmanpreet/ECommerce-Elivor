import './style.scss'
import React, { useEffect, useState } from 'react'
import CartItem from '../../components/cartItem';
const jwt = require('jsonwebtoken');

const products = [
    {
        title: "Product1",
        price: "24",
        image: "p1.png",
        id: "1010",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, earum."

    },
    {
        title: "Product2",
        price: "154",
        image: "p2.png",
        id: "2020",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, earum."
    },
    {
        title: "Product3",
        price: "24",
        image: "p3.png",
        id: "3030",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, earum."
    },
    {
        title: "Product4",
        price: "154",
        image: "p4.png",
        id: "4040",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, earum."
    }
]

const Main = () => {
    const [userData, setUserData] = useState({});
    useEffect(async () => {
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
                const truUser = jwt.verify(givingToken, secretKey);
                setUserData(truUser);
            }
        }
    }, [])
    return (
        <>
            <section className='orderConfirm_page'>
                <div className='heading_container'>
                    <h3>Order Confirmation</h3>
                </div>
                <div className='order_confirmation_message'>
                    <h4>Hello {userData.firstName},</h4>
                    <h4>Thank you for shopping with us. Your order has been confirmed. The summary for your order appears below:</h4>
                </div>
                <div className='order_summary'>
                    <div className='order_summary_text'>
                        <hr />
                        <h2>Order summary</h2>
                        <hr />
                        <br />
                        <h4>
                            Order Date: 01-12-2021
                            <br />
                            Order ID: #919210971
                            <br />
                            Paid with: Visa Credit card ending at 9001
                        </h4>
                    </div>
                    <div className='cart_products'>
                        {
                            products.slice(0, 4).map((prod, key) => (
                                <div className='cart_item' key={key}><CartItem {...prod}></CartItem></div>
                            ))
                        }
                    </div>
                </div>
                <div className='order_help'>
                    <hr />    <br />
                    <h4>If you require any further clarification about your order, feel free to contact us.</h4>
                    <h4>Thanks again for your business! We appreciate that you've chosen us</h4>
                    <br />
                    <h4>Thanks,</h4>
                    <h4>Company Name</h4>
                    <br />
                    <h4>Contact us:</h4>
                    <div className='contact_link_box'>
                        <ul className='contact_list'>
                            <li>
                                <a href='https://maps.google.com'>
                                    <i className='map_marker' aria-hidden='true'>L </i>
                                    Location:
                                </a>
                            </li>
                            <li>
                                <a href='https://www.google.com'>
                                    <i className='phone' aria-hidden='true'>C </i>
                                    Call: 1234567890
                                </a>
                            </li>
                            <li>
                                <a href='https://www.gmail.com'>
                                    <i className='envelope' aria-hidden='true'>E </i>
                                    Email: demo@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'OrderCompleted'
//Pre process the container with Redux Plugins
export default Main