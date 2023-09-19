import './style.scss'
import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const Main = (props) => {
    // console.log("props")
    // console.log(props)
    const [prodInfo, setProdInfo] = useState({});
    const getProductInfo = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/getProductInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prdctID: props.product,
            })
        })
        try {
            // console.log("After fetching")
            const data = await res.json();
            if (res.status === 404 || !data) {
                // console.log("error 404: while adding data ");
                alert(`Error in fetching cart from database`);
            } else {
                // console.log(data)
                setProdInfo(data.prdctInfo);
                // alert(data.message);
                // window.location.href = '/cart';
            }
        }
        catch (err) {
            // console.log(err)
        }
    }
    useEffect(() => {
        getProductInfo();
    }, [])

    const deleteProductFromCart = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/deleteProductFromCart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentToken: props.currentToken,
                prdctID: props.product,
            })
        })
        try {
            // console.log("After fetching")
            const data = await res.json();
            if (res.status === 404 || !data) {
                // console.log("error 404: while adding data ");
                alert(`Error in deleting product from database`);
            } else {
                // console.log("data")
                // console.log(data)
                // alert(data.message);
                setProdInfo({
                    ...prodInfo,
                    quantity: data.quantity
                })
                // window.location.href = '/cart';
                props.fxn();
            }
        }
        catch (err) {
            // console.log(err)
        }
    }


    return (
        <>
            <td>
                <IconButton color="error" onClick={deleteProductFromCart} sizevariant="contained" aria-label="delete">
                    <HighlightOffIcon />
                </IconButton>
            </td>
            <td className='prodDet'>
                <Link className='cart_item_product_link' to={`productDetails/${props.product}`}>
                    <img className='cart_product_image' src={`/uploads/${prodInfo.image}`} alt='prod_image' />
                    <div className='cart_item_product_info'>
                        <h6><strong>{prodInfo.title}</strong></h6>
                        <p><strong>Category:</strong> {prodInfo.categoryName}</p>
                    </div>
                </Link>
            </td>
            <td className="actions-buttons">
                <p>${prodInfo.price}.00</p>
            </td>
            <td className="actions-buttons">
                <h5>{props.quantity}</h5>
                {/* <input type="number" value={props.quantity} placeholder='1' /> */}
            </td>
            <td>
                <p>${prodInfo.price * props.quantity}.00</p>
            </td>
        </>
    );
}

Main.displayName = 'CartItem'
//Pre process the container with Redux Plugins
export default Main;
