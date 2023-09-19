import './style.scss'
import React, { useEffect, useState } from 'react'

const Main = (props) => {
    // console.log("props in compo")
    // console.log(props.props)
    const [prodInfo, setProdInfo] = useState([]);
    useEffect(async () => {
        // console.log("in useeffect compo")
        props.props.map(async (prod, id) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/getProductInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prdctID: prod.product,
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
                    setProdInfo(old => [...old, data.prdctInfo]);
                }
            }
            catch (err) {
                // console.log(err)
            }
        })
    }, [])
    return (
        <>
            {
                prodInfo.map((prod, id) => {
                    return (
                        <div className='orderItem' key={id}>
                            <div><img className='product_image' src={`/uploads/${prod.image}`} alt='prod_image' /></div>
                            <div className='orderProduct_Details'>
                                Title: <strong>{prod.title}</strong><br />
                                Category: <strong>{prod.categoryName}</strong><br />
                                Sub-total: <strong>{props.props[id].quantity} x ${prod.price}</strong>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
}

Main.displayName = 'OrderHistoryComponent'
//Pre process the container with Redux Plugins
export default Main;