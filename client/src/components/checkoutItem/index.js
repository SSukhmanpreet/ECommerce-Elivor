import './style.scss'
import React, { useEffect, useState } from 'react'
const Main = (props) => {
    const [prodInfo, setProdInfo] = useState({});
    useEffect(async () => {
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
    }, [])
    return (
        <>
            <img src={`/uploads/${prodInfo.image}`} alt='prod_image' />
            <small><strong>{prodInfo.title}</strong><br/>{prodInfo.categoryName}</small>
            <span>{props.quantity} x ${prodInfo.price}</span>
        </>
    );
}

Main.displayName = 'CheckoutItem'
//Pre process the container with Redux Plugins
export default Main;