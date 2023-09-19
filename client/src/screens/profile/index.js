import './style.scss'
import { Button, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
    const [userData, setUserData] = useState({});

    const signOut = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/user/signOut`, {
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
            }
            else {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/user/profile`, {
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
                    setUserData(data);
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
                        <p><Link to='/'>Home</Link> / <Link to='/profile'>User</Link> / Profile</p>
                    </div>
                    <div className='heading_container'>
                        <h3>Welcome to your profile, {userData.userName}</h3>
                    </div>
                    <div className='content_section'>
                        <div className='left'>
                            <div className='user_card'>
                                <img src='about-img.png' alt='John' />
                                <h1>{userData.firstName} {userData.lastName}</h1>
                                <p>PERSONAL PROFILE</p>
                                <br />
                                <Link to='/signOut' onClick={signOut}>
                                    <Button variant="contained">Sign Out</Button>
                                </Link>
                            </div>
                            <div className='user_actions'>
                                <Link to='/orderHistory'>
                                    <Button variant="contained">All Orders</Button>
                                </Link>
                                {/* <br />
                                <br />
                                <Link to='/savedAddress'>
                                    <Button variant="contained">Saved Addresses</Button>
                                </Link> */}
                            </div>
                        </div>
                        <div className='right'>
                            <div className='user_info'>
                                <h2>User details</h2>
                                <div className="row_container">
                                    <form action='/'>
                                        <div className="row">
                                            <div className="row-content">
                                                <label htmlFor="">Firstname</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={userData.firstName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={userData.firstName} readOnly /> */}
                                            </div>
                                            <div className="row-content">
                                                <label htmlFor="">Lastname</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={userData.lastName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={userData.lastName} readOnly /> */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="row-content">
                                                <label htmlFor="">Username</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={userData.userName}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='text' placeholder={userData.userName} readOnly /> */}
                                            </div>
                                            <div className="row-content">
                                                <label htmlFor="">Email ID</label>
                                                <br />
                                                <TextField
                                                    className='checkout_textfield'
                                                    type='text'
                                                    name='userName'
                                                    value={userData.email}
                                                    id="filled-required"
                                                    variant="filled"
                                                    disabled
                                                />
                                                {/* <input type='email' placeholder={userData.email} readOnly /> */}
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
