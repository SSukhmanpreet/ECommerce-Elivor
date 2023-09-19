import './style.scss'
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deldata } from '../../../components/context/ContextProvider';

const Main = () => {

    //------------------- Table ------------------- //
    //getting data
    const [userData, setUserData] = useState([]);
    const getUserData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/admin/getAllUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (res.status === 404 || !data) {
            alert(`Error in fetching data from database`);
            // console.log(`Error in fetching data from database`);
        } else {
            setUserData(data);
        }
    }

    //useeffect to get data once page loads
    useEffect(async () => {
        getUserData();
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
    }, [])

    //for deleting data from database
    const { dltData, setDLTdata } = useContext(deldata);
    const deleteUser = async (id) => {
        const res2 = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/admin/deleteUser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 404 || !deleteData) {
            // console.log("Error while deleting data");
        } else {
            setDLTdata(deleteData)
            alert("User DELETED from the database");
            getUserData();
        }

    }
    return (
        <>
            <section className='allUsers_page'>
                <div className='heading_container'>
                    <h3>All Registered Users</h3>
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
                        <Button className='buttons' variant="contained">Added Products</Button>
                        {/* <button>
                            Added Products
                        </button> */}
                    </Link>
                    <Link to='/admin/registeredUsers'>
                        <Button disabled={true} className='buttons' variant="contained">Regitered Users</Button>
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
                <div className="displayUsers_container">
                    <table className="table">
                        <thead className="table_head">
                            <tr>
                                <th scope="col">S. No.</th>
                                <th scope="col">Username</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Created At</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData.map((element, id) => {
                                    const crtdAtY = element.createdAt.substr(0, 4);
                                    const crtdAtM = element.createdAt.substr(4, 4);
                                    const crtdAtD = element.createdAt.substr(8, 2);
                                    const crtdAtT = element.createdAt.substr(11, 8);
                                    const crtdAtTotal = "[" + crtdAtT + "] " + crtdAtD + crtdAtM + crtdAtY;
                                    return (
                                        <tr className='table_row' key={element._id}>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.userName}</td>
                                            <td>{element.firstName + " " + element.lastName}</td>
                                            <td>{element.email}</td>
                                            <td>{crtdAtTotal}</td>
                                            <td className="actions-buttons">
                                                <Button color='error'  onClick={() => deleteUser(element._id)} variant="contained">Delete</Button>
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
    )
}

Main.displayName = 'RegisteredUsers'
//Pre process the container with Redux Plugins
export default Main
