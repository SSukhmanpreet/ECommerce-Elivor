import './style.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deldata } from '../../../components/context/ContextProvider';
import { Button } from '@mui/material';

const Main = () => {
    const [prodData, setProdData] = useState([]);
    const getProdData = async () => {
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
            setProdData(data);
        }
    }
    useEffect(async () => {
        getProdData();
        if (localStorage.getItem('token') === "undefined") {
            alert("Please Sign In to continue")
            window.location.href = '/admin/signIn'
        }
        else {
            const givingToken = localStorage.getItem('token');
            // console.log(givingToken)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/admin`, {
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
                window.location.href = '/admin/signIn'
            }
        }
    }, []);
    const { dltdata, setDLTdata } = useContext(deldata);
    const deleteProduct = async (id) => {
        const res2 = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/deleteProduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 404 || !deleteData) {
            // console.log("error 404: while deleting data in edit");
        } else {
            setDLTdata(deleteData)
            alert("Product DELETED from the database");
            getProdData();
        }

    }
    return (
        <>
            <section className='productslist_section'>
                <div className='heading_container'>
                    <h3>
                        All Added Products
                    </h3>
                    <br />
                    <Link to='/admin/addCategory'>
                        <Button className='buttons' variant="contained">Add Category</Button>
                        {/* <button>
                            Add Category
                        </button> */}
                    </Link>
                    <Link to='/admin/addProduct'>
                        <Button className='buttons' variant="contained">Add Product</Button>
                        {/* <button>
                            Add Product
                        </button> */}
                    </Link>
                    <Link to='/admin/productsList'>
                        <Button disabled={true} className='buttons' variant="contained">Added Products</Button>
                        {/* <button>
                            Added Products
                        </button> */}
                    </Link>
                    <Link to='/admin/registeredUsers'>
                        <Button className='buttons' variant="contained">Regitered Users</Button>
                        {/* <button>
                            Regitered Users
                        </button> */}
                    </Link>
                    <Link to='/admin/profile'>
                        <Button className='buttons' variant="contained">Profile</Button>
                        {/* <button>
                            Profile
                        </button> */}
                    </Link>

                </div>
                <div className="displayProducts_container">
                    <table className="table">
                        <thead className="table_head">
                            <tr>
                                <th scope="col">S. No.</th>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                prodData.map((prod, id) => {
                                    return (
                                        <tr className='table_row' key={prod._id}>
                                            <th scope="row">{id + 1}</th>
                                            <td> <img src={`/uploads/${prod.image}`} alt="img" /> </td>
                                            <td>{prod.title}</td>
                                            <td>{prod.categoryName}</td>
                                            <td>{prod.stock}</td>
                                            <td>${prod.price}</td>
                                            <td className="actions-buttons">
                                                <Link to={`editProduct/${prod._id}`}><Button color='warning' variant="contained">Edit</Button></Link>
                                                {/* <NavLink to={`editProduct/${prod._id}`}><button className="btn">Edit</button></NavLink> */}
                                            </td>
                                            <td className="actions-buttons">
                                                <Button color='error' onClick={() => deleteProduct(prod._id)} variant="contained">Delete</Button>
                                                {/* <button onClick={() => deleteProduct(prod._id)}>Delete</button> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'ProductsList'
//Pre process the container with Redux Plugins
export default Main