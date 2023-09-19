import './style.scss'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { adddata } from '../../../components/context/ContextProvider';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import AppleIcon from '@mui/icons-material/Apple';
import { Button, TextField } from '@mui/material';

const Main = () => {
    const { udata, setUdata } = useContext(adddata);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (event) => {
        event.preventDefault()
        // console.log("onsubmit")

        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/admin/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify({
                firstName,
                lastName,
                userName,
                email,
                password,
            }),
        });
        // console.log("after fetch")

        const data = await response.json()


        if (response.status === 404 || !data) {
            // console.log("error while putting data ");
            alert(data);
        } else {
            setUdata(data)
            alert("Created Admin User Account Successfully")
            window.location.href = '/admin/signIn'
        }
    }
    return (
        <>
            <section className="signUp_page background-radial-gradient overflow-hidden">

                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="zdiv col-lg-6 mb-5 mb-lg-0">
                            <p className="colorp mb-4 opacity-70">
                                ADMIN SIGN UP
                            </p>
                            <h1 className="colorh1 my-3 display-5 fw-bold ls-tight">
                                Create an ADMIN account. <br />
                            </h1>

                            <h4 className="colorp mb-4 my-5 opacity-70">Already an ADMIN? <Link to='/signIn'>Sign In</Link></h4>

                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <p>Enter all the required details to create a new ADMIN account</p>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <TextField
                                                        required
                                                        id="filled-required"
                                                        label="First Name"
                                                        defaultValue="Hello World"
                                                        variant="filled"
                                                        type='text'
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                    {/* <label>Enter your firstname</label>
                                                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} /> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <TextField
                                                        required
                                                        id="filled-required"
                                                        label="Last Name"
                                                        defaultValue="Hello World"
                                                        variant="filled"
                                                        type='text'
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    {/* <label>Enter your lastname</label>
                                                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-md-6  mb-4">
                                                <TextField
                                                    required
                                                    id="filled-required"
                                                    label="Username"
                                                    defaultValue="Hello World"
                                                    variant="filled"
                                                    type='text'
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                                {/* <label>Enter your username</label>
                                            <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} /> */}
                                            </div>

                                            <div className="col-md-6  mb-4">
                                                <TextField
                                                    required
                                                    id="filled-required"
                                                    label="Email"
                                                    defaultValue="Hello World"
                                                    variant="filled"
                                                    type='email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {/* <label>Enter your email ID</label>
                                            <input type='email' placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <TextField
                                                required
                                                id="filled-password-input"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                variant="filled"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {/* <label>Enter your password</label>
                                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                                        </div>
                                        <div className="signInButton">
                                            <Button type='submit' onClick={registerUser} variant="contained">SIGN UP NOW</Button>
                                            {/* <input type='submit' onClick={registerUser} value='SIGN UP NOW' /> */}
                                        </div>
                                        {/* <br />
                                        <br />
                                        <div className="text-center">
                                            <p>or sign up using:</p>
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
            </section>
        </>
        // <>
        //     <section className="background-radial-gradient overflow-hidden">

        //         <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        //             <div className="row gx-lg-5 align-items-center mb-5">
        //                 <div className="zdiv col-lg-6 mb-5 mb-lg-0">
        //                     <p className="colorp mb-4 opacity-70">
        //                         SHOP FREELY
        //                     </p>
        //                     <h1 className="colorh1 my-5 display-5 fw-bold ls-tight">
        //                         Create an account. <br />
        //                     </h1>

        //                     <h4>Already an Admin? <Link to='/signIn'>Sign In</Link></h4>

        //                 </div>

        //                 <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        //                     <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        //                     <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        //                     <div className="card bg-glass">
        //                         <div className="card-body px-4 py-5 px-md-5">
        //                             <form>
        //                                 <div className="row">
        //                                     <div className="col-md-6 mb-4">
        //                                         <div className="form-outline">
        //                                             <label>Enter your firstname</label>
        //                                             <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        //                                         </div>
        //                                     </div>
        //                                     <div className="col-md-6 mb-4">
        //                                         <div className="form-outline">
        //                                             <label>Enter your lastname</label>
        //                                             <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        //                                         </div>
        //                                     </div>
        //                                 </div>

        //                                 <div className="form-outline mb-4">
        //                                     <label>Enter your username</label>
        //                                     <input type='text' placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
        //                                 </div>

        //                                 <div className="form-outline mb-4">
        //                                     <label>Enter your email ID</label>
        //                                     <input type='email' placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} />
        //                                 </div>

        //                                 <div className="form-outline mb-4">
        //                                     <label>Enter your password</label>
        //                                     <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //                                 </div>

        //                                 <div className="form-outline mb-4">
        //                                     <label>Confirm your password</label>
        //                                     <input type='password' placeholder='Password' />
        //                                 </div>
        //                                 <div className="row row_button">
        //                                     <input type='submit' onClick={registerUser} value='SIGN UP NOW' />
        //                                 </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>
        // <>
        //     <section className='signUp_page'>
        //         <div className='heading_container'>
        //             <h3>Sign Up for an ADMIN account</h3>
        //         </div>
        //         <div className='sign_form'>
        //             <form action='/'>
        //                 <label>Enter your firstname</label>
        //                 <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        //                 <label>Enter your lastname</label>
        //                 <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        //                 <label>Enter your username</label>
        //                 <input type='text' placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
        //                 <label>Enter your email ID</label>
        //                 <input type='email' placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} />
        //                 <label>Enter your password</label>
        //                 <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //                 <input type='submit' onClick={registerUser} value='SIGN UP NOW' />
        //             </form>
        //         </div>
        //     </section>
        // </>
    );
}


Main.displayName = 'SignUp'
//Pre process the container with Redux Plugins
export default Main