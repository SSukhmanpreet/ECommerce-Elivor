import './style.scss'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
    const [prodData, setProdData] = useState([]);
    // const [quantity, setQuantity] = useState(1);
    const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    const getData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getProduct/${props._id}`, {
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
        }
    }
    // const addInpData = async (e) => {
    // const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    //     setQuantity(1)
    //     // if (!quantity) {
    //     //     return alert("Please fill quantity");
    //     // }
    //     if (localStorage.getItem('token') === "undefined") {
    //         alert("Please Sign In to continue")
    //         window.location.href = '/signIn'
    //     }
    //     else {
    //         const givingToken = localStorage.getItem('token');
    //         // console.log(givingToken)
    //         const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/user`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 token: givingToken,
    //             })
    //         })
    //         const data = await response.json()
    //         // console.log(data.message)
    //         if (response.status !== 200) {
    //             alert(data.message)
    //             window.location.href = '/signIn'
    //         } else {
    //             // console.log("in else")

    //             const userTokenDetails = jwt.verify(givingToken, secretKey);
    //             // console.log(userTokenDetails)

    //             const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/addProductToCart`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     user: userTokenDetails.id,
    //                     cartItems: {
    //                         product: props._id,
    //                         quantity: quantity,
    //                         price: prodData.price,
    //                     }
    //                 })
    //             })
    //             try {
    //                 // console.log("After fetching")
    //                 const data = await res.json();
    //                 if (res.status === 404 || !data) {
    //                     // console.log("error 404: while adding data ");
    //                     alert(`Error in adding cart item to database`);
    //                 } else {
    //                     // console.log(data)
    //                     window.location.href = '/cart';
    //                 }
    //             }
    //             catch (err) {
    //                 // console.log(err)
    //             }
    //         }
    //     }
    // }
    useEffect(() => {
        getData();
    }, []);
    return (
        <Card className="cards" sx={{ width: 220, height: 400, padding: '5px', margin: "15px" }}>
            <Tooltip title={`Click to know more about "${props.title}"`}>
                <Link to={`/productDetails/${props._id}`} style={{ textDecoration: 'none' }}>
                    <CardActionArea className='cardActionArea' sx={{ padding: 0 }}>
                        <CardMedia
                            className='cardMedias'
                            component="img"
                            image={`/uploads/${props.image}`}
                            alt={props.title}
                            sx={{ backgroundColor: '#C4D7E0', padding: 0 }}
                        />

                        <CardContent sx={{ padding: 1, marginTop: 1 }}>
                            <Typography variant="p" color={"black"} fontFamily={"Poppins"} fontWeight={600}>
                                {props.title}
                            </Typography>
                            <br />
                            <Typography className='catAndPrice' gutterBottom sx={{ fontSize: "12px", marginBottom: 1, marginTop: 0 }} variant="subtitle2" fontFamily={"Poppins"}>
                                <p> {props.categoryName}</p>
                                {/* </Typography> */}
                                {/* <Typography gutterBottom variant="body1" fontFamily={"Poppins"} fontWeight={300}> */}
                                {`$${props.price} `}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Tooltip>

            {/* <div className='buttons'>
                <Link to={props.btn1Link}>
                    <Button className="addtoCartButton"size="medium" onClick={addInpData} >{props.btn1}</Button>
                </Link>
            </div> */}
        </Card>
    );
}





// const Main = (props) => {
    // const { id } = useParams();
    // const [prodData, setProdData] = useState([]);
    // const [quantity, setQuantity] = useState(1);
    // const getData = async () => {
    //     const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getProduct/${props._id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });
    //     const data = await res.json();
    //     if (res.status === 404 || !data) {
    //         console.log("Error while getting data in prodDetails");
    //     } else {
    //         setProdData(data);
    //     }
    // }
    // const addInpData = async (e) => {
    // const secretKey = process.env.SECRET || "some secret passphrase here for local development";
    //     setQuantity(1)
    //     if (localStorage.getItem('token') === "undefined") {
    //         alert("Please Sign In to continue")
    //         window.location.href = '/signIn'
    //     }
    //     else {
    //         const givingToken = localStorage.getItem('token');
    //         console.log(givingToken)
    //         const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/user`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 token: givingToken,
    //             })
    //         })
    //         const data = await response.json()
    //         console.log(data.message)
    //         if (response.status !== 200) {
    //             alert(data.message)
    //             window.location.href = '/signIn'
    //         } else {
    //             console.log("in else")

    //             const userTokenDetails = jwt.verify(givingToken, secretKey);
    //             console.log(userTokenDetails)

    //             const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/cart/addProductToCart`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     user: userTokenDetails.id,
    //                     cartItems: {
    //                         product: id,
    //                         quantity: quantity,
    //                         price: prodData.price,
    //                     }
    //                 })
    //             })
    //             try {
    //                 console.log("After fetching")
    //                 const data = await res.json();
    //                 if (res.status === 404 || !data) {
    //                     console.log("error 404: while adding data ");
    //                     alert(`Error in adding cart item to database`);
    //                 } else {
    //                     console.log(data)
    //                     alert(data.message);
    //                     window.location.href = '/cart';
    //                 }
    //             }
    //             catch (err) {
    //                 console.log(err)
    //             }
    //         }
    //     }
    // }
    // useEffect(() => {
    //     getData();
    // }, []);
    // return (
    //     <>
    //         <div className='prod_click'>
    //             <Link to={`/productDetails/${props._id}`}>
    //                 <div className='img_box'>
    //                     <img src={`/uploads/${props.image}`} alt={props.title} />
    //                 </div>
    //                 <div className='detail_box'>
    //                     <h5>
    //                         {props.title}
    //                     </h5>
    //                     <h6>
    //                         ${props.price}
    //                     </h6>
    //                 </div>
    //             </Link>
    //         </div>
    // <div className='option_contain'>
    //     <div className='options'>
    //         <button to={props.btn1Link} onClick={addInpData} className='option1'>
    //             {props.btn1}
    //         </button>
    //         <button to={props.btn2Link} className='option2'>
    //             {props.btn2}
    //         </button>
    //     </div>
    // </div>
    //     </>
    // );
// }

// Main.displayName = 'ProductCard'
//Pre process the container with Redux Plugins
// export default Main