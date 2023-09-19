import './style.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material';

const Main = () => {
    const [adminData, setAdminData] = useState({});
    const signOut = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/admin/signOut`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
        // console.log("after fetch")

        const data = await response.json()
        // console.log("data got")
        // console.log(data)

        if (data) {
            // console.log(data.json);
            localStorage.removeItem('token');
        } else {
            // console.log("no data found");
            alert('Please signIn again')
            window.location.href = '/signIn'
        }
    }
    useEffect(async () => {
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
            else {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/admin/profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: givingToken,
                    })
                })
                // console.log("after fetch profile")

                const data = await res.json()
                // console.log("data got")
                // console.log(data)

                if (data) {
                    setAdminData(data);
                } else {
                    // console.log("no data found");
                    alert('Please signIn again')
                    window.location.href = '/signIn'
                }
            }
        }
    }, [])
    return (
        <>
            <section className='profile_page'>
                <div className='profile_page_container'>
                    <div className='goBack'>
                        <p><Link to='/'>Home</Link> / <Link to='/admin/profile'>Admin</Link> / Profile</p>
                    </div>
                    <div className='heading_container'>
                        <h3>Welcome to Admin Profile, {adminData.userName}</h3>
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
                        <Button className='buttons' variant="contained">Regitered Users</Button>
                        {/* <button>
                            Regitered Users
                        </button> */}
                    </Link>
                    <Link to='/admin/profile'>
                        <Button disabled={true} className='buttons' variant="contained">Profile</Button>
                        {/* <button>
                            Profile
                        </button> */}
                    </Link>

                    </div>
                    <div className='content_section'>
                        <div className='left'>
                            <div className='user_card'>
                                <img src='../about-img.png' alt='John' />
                                <h1>{adminData.firstName} {adminData.lastName}</h1>
                                <p>ADMIN PROFILE</p>
                                <br />
                                <Link to='/admin/signOut' onClick={signOut}>
                                    <Button variant="contained">Sign Out</Button>
                                    {/* <button>Sign Out</button> */}
                                </Link>
                            </div>
                            {/* <div className='user_actions'>
                                <Link to='/admin/addCategory'>
                                    <Button variant="contained">Add New Category</Button>
                                </Link>
                                <Link to='/admin/addProduct'>
                                    <Button variant="contained">Add New Product</Button>
                                </Link>
                                <Link to='/admin/productsList'>
                                    <Button variant="contained">Added Products</Button>
                                </Link>
                                <Link to='/admin/registeredUsers'>
                                    <Button variant="contained">Regitered Users</Button>
                                </Link>
                            </div> */}
                        </div>
                        <div className='right'>
                            <div className='user_info'>
                                <h2>Admin User details</h2>
                                <div className="row_container">
                                    <form action='/'>
                                    <div className="row">
                                            <div className="row-content">
                                                <label htmlFor="">Admin's Firstname</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={adminData.firstName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={adminData.firstName} readOnly /> */}
                                            </div>
                                            <div className="row-content">
                                                <label htmlFor="">Admin's Lastname</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={adminData.lastName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={adminData.lastName} readOnly /> */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="row-content">
                                                <label htmlFor="">Admin's Username</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={adminData.userName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={adminData.userName} readOnly /> */}
                                            </div>
                                            <div className="row-content">
                                                <label htmlFor="">Admin's Email ID</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={adminData.email}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='email' placeholder={adminData.email} readOnly /> */}
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <Button className='button' variant="contained">Edit Your Information</Button>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Main.displayName = 'Profile'
//Pre process the container with Redux Plugins
export default Main
