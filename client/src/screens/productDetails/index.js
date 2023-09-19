import './style.scss'
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import HomeProductCard from '../../components/homeProductCard';
const jwt = require('jsonwebtoken');

const Main = () => {
    const { id } = useParams();
    // console.log(id)
    const [prodData, setProdData] = useState([]);
    const [allProdData, setAllProdData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [arrProd, setArrProd] = useState([]);

    const getData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getProduct/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 404 || !data) {
            // console.log("Error while getting data in prodDetails");
        } else {
            setProdData(data);
            // console.log("prodData");
            // console.log(prodData);

            // console.log("discount_price")
            // console.log(discount_price)
            // console.log("prodData.price")
            // console.log(prodData.price)
        }
    }

    const getAllProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getAllProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);
        // console.log("-----------------");

        if (res.status === 404 || !data) {
            // console.log("Error 404: while getting data in home ");
        } else {
            setAllProdData(data);
            const randomData = [];
            for (var i = 0; i < data.length; i++) {
                randomData[i] = data[i];
            }
            setArrProd(randomData.sort(() => 0.5 - Math.random()))
        }
    }

    const addInpData = async (e) => {
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    if (!quantity) {
            return alert("Please fill quantity");
        }
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
                // console.log("in else")

                const userTokenDetails = jwt.verify(givingToken, secretKey);
                // console.log(userTokenDetails)

                const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/addProductToCart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: userTokenDetails.id,
                        cartItems: {
                            product: id,
                            quantity: quantity,
                            price: prodData.price,
                        }
                    })
                })
                try {
                    // console.log("After fetching")
                    const data = await res.json();
                    if (res.status === 404 || !data) {
                        // console.log("error 404: while adding data ");
                        alert(`Error in adding cart item to database`);
                    } else {
                        // console.log(data)
                        window.location.href = '/cart';
                    }
                }
                catch (err) {
                    // console.log(err)
                }
            }
        }
    }
    useEffect(() => {
        getData();
        getAllProdData();
        // console.log("window.location.pathname");
        // console.log(window.location.pathname);
    }, []);
    const discount_price = parseInt(prodData.price) - (0.2 * (parseInt(prodData.price)));

    const setQuant = (symbol) => {
        if (symbol === '-') {
            setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }
    return (
        <>
            <section className='details_page'>
                <div className='goBack'>
                    <p><Link to='/'>Home</Link> / <Link to='/productsList'>Products List</Link> / {prodData.title}</p>
                </div>
                <div className='product_container'>
                    <div className='product_left'>
                        {/* <div className="otherImages">
                            <div className="images">
                                <img src={`/uploads/${prodData.image}`} alt="prod_image" />
                            </div>
                            <div className="images">
                                <img src={`/uploads/${prodData.image}`} alt="prod_image" />
                            </div>
                            <div className="images">
                                <img src={`/uploads/${prodData.image}`} alt="prod_image" />
                            </div>
                            <div className="images">
                                <img src={`/uploads/${prodData.image}`} alt="prod_image" />
                            </div>
                        </div> */}
                        <div className='img_thumb'>
                            <img src={`/uploads/${prodData.image}`} alt='prod_image' />
                        </div>
                    </div>
                    <div className='product_right'>
                        <div className='content_head'>
                            <h1>{prodData.title}</h1>
                            <h6>‣{prodData.categoryName}</h6>
                        </div>
                        <div className='content_price'>
                            <h4>${discount_price}<small> <s>${prodData.price}</s></small></h4>
                            <h5>or 4 interest-free payments of ${discount_price / 4}</h5>
                            <p><strong>20% off</strong> prices as marked</p>
                        </div>
                        <div className='content_quant_cart'>
                            <div className="quant_div">
                                <div className="button1" onClick={() => { setQuant('-') }}>
                                    <h4>-</h4>
                                </div>
                                <input type='number' name="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} placeholder='1' />
                                <div className="button2" onClick={() => { setQuant('+') }}>
                                    <h4>+</h4>
                                </div>
                            </div>
                            <Button className='cartbutton' onClick={addInpData} variant="contained">Add to Cart</Button>
                        </div>
                        <div className='product_detail'>
                            <h4>Details</h4>
                            <p>{prodData.description}</p>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <hr />
                <div className="mayAlso">
                    <div className="mayAlso_heading">
                        <h3>You may also like</h3>
                    </div>

                    <div className='row'>
                        {
                            arrProd.slice(0, 4).map((prod, key) => (
                                <HomeProductCard
                                    key={key}
                                    {...prod}
                                    btn1="Add to Cart"
                                    btn2="Buy Now"
                                    btn1Link="/cart"
                                    btn2Link="/checkout"
                                    wdth='300px'
                                    hght='500px'
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'ProductDetails'
//Pre process the container with Redux Plugins
export default Main