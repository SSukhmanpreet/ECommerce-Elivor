import './style.scss'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import AppleIcon from '@mui/icons-material/Apple';
import { Button, TextField } from '@mui/material';

const Main = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = async (event) => {
        event.preventDefault()
        // console.log("onsubmit")
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/user/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json()
        // console.log(data.message)
        if (response.status === 200) {
            localStorage.setItem('token', data.access_token)
            alert(data.message)
            window.location.href = '/'
        } else {
            alert(data.message)
        }
    }
    useEffect(async () => {
        if (localStorage.getItem('token')) {
            const givingToken = localStorage.getItem('token');
            // console.log('token found')
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
            if (response.status === 200) {
                window.location.href = '/profile'
            }
            // if (response.status === 404) {
            //     const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/admin`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             token: givingToken,
            //         })
            //     })
            //     if (res.status === 200) {
            //         window.location.href = '/admin/profile';
            //     }
            // } else {
            //     window.location.href = '/profile';
            // }
        }
    }, [])
    return (
        <>
            <section className="signIn_page background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="zdiv col-lg-6 mb-5 mb-lg-0" >
                            <p className="colorp opacity-70">
                                SHOP FREELY
                            </p>
                            <h1 className="colordiv my-3 display-5 fw-bold ls-tight">
                                Sign in right now.<br />
                                {/* <span style="color: hsl(218, 81%, 75%)">for your business</span> */}
                            </h1>
                            <p className="colorp opacity-70 my-5">Don't have an account yet? <Link to='/signUp'>Click here to create one.</Link></p>
                            <p className='adminText'>Admin? <Link to='/admin/signin'>Sign In here</Link></p>

                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body mx-3 px-4 py-5 px-md-5">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <TextField id="filled-basic" label="Email ID" variant="filled"
                                                        type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    {/* <label >Enter your email ID</label>
                                                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email ID' /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">

                                                    <TextField
                                                        id="filled-password-input"
                                                        label="Password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        variant="filled"
                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    {/* <label >Enter your password</label>
                                                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /> */}
                                                </div>
                                            </div>
                                            <div className='signInButton'>
                                                <Button type='submit' onClick={loginUser} variant="contained">SIGN IN</Button>
                                            </div>
                                        </div>
                                        {/* <input type='submit' onClick={loginUser} value='SIGN IN' /> */}
                                        {/* <br />
                                        <br />
                                        <div className="text-center">
                                            <p>or sign in using:</p>
                                        </div>
                                        <div className="text-center otherWays">
                                            <div className='otherWays_links'>
                                                <a href='https://www.facebook.com'>
                                                    <FacebookIcon />
                                                    Facebook
                                                </a>
                                            </div>
                                            <div className='otherWays_links'>
                                                <a href='https://www.apple.com'>
                                                    <AppleIcon />
                                                    Apple
                                                </a>
                                            </div>
                                            <div className='otherWays_links'>
                                                <a href='https://www.google.com'>
                                                    <GoogleIcon />
                                                    Google
                                                </a>
                                            </div>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
        //     <>
        //     <section className='signIn_page'>
        //         <div className="hero-image">
        //             <div className="hero-text">
        //                 <h1>Our Vision and Values</h1>
        //                 <h4> Our mission as a business is ‘to offer a wide range of well-designed, functional home furnishing products at prices so low that as many people as possible will be able to afford them’. </h4>
        //             </div>
        //         </div>
        //         <div className='heading_container'>
        //             <h3>Sign in with your Account</h3>
        //         </div>
        //         <div className='sign_form'>
        //             <form>
        //                 <label >Enter your email ID</label>
        //                 <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email ID' />
        //                 <label >Enter your password</label>
        //                 <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        //                 <input type='submit' onClick={loginUser} value='SIGN IN' />
        //             </form>
        //             <p>Don't have an account yet? <Link to='/signUp'>Click here to create one.</Link></p>
        //             <br />
        //             <p><Link to='/profile'>Go To Profile</Link></p>
        //         </div>
        //     </section>
        // </>

        // <>
        //     <section className='signIn_page'>
        //         <div className="hero-image">
        //             <div className="hero-text">
        //                 <h4>SHOP FREELY</h4>
        //                 <h1>Sign in right now.</h1>
        //                 <div className='sign_form1'>
        //                     <form>
        //                         <InputWithIcon type='email' value={email} placeholder='Email ID' onChange={(e) => setEmail(e.target.value)} />
        //                         <InputWithIcon type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        //                         {/* <label>Enter your email ID</label> */}
        //                         {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email ID' /> */}
        //                         {/* <label>Enter your password</label> */}
        //                         {/* <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /> */}
        //                         <input type='submit' onClick={loginUser} value='SIGN IN' />
        //                     </form>
        //                 </div>
        //                 <h4>Don't have an account yet? <Link to='/signUp'>Click here to create one.</Link></h4>
        //             </div>
        //             <div className="other_sign_in">
        //                 <p>or sign in with</p>
        //                 <h3>google</h3>
        //                 <h3>facebook</h3>
        //                 <h3>yahoo</h3>
        //             </div>
        //         </div>

        //     </section>
        // </>
    );
}


Main.displayName = 'SignIn'
//Pre process the container with Redux Plugins
export default Main