import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <section className='signOut_page'>
                <div className='heading_container'>
                    <h3>Admin Account Signed Out Successfully</h3>
                </div>
                <div className='sign_out_content'>
                    <h4>You have successfully signed out of the website.</h4>
                    <p><Link to='/'>Click here to continue exploring the website</Link></p>
                    <br />
                    <hr />
                    <br />
                    <h4>Want to make some more changes? <Link to='/admin/signIn'>Click here to sign back in as ADMIN.</Link></h4>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'SignOut'
//Pre process the container with Redux Plugins
export default Main;