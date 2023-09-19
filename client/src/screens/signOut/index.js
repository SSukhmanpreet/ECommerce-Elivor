import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <section className='signOut_page'>
                <div className='heading_container'>
                    <h3>Signed Out Successfully</h3>
                </div>
                <div className='sign_out_content'>
                    <h4><span>Thank you for visiting and Shopping with us!</span><br /><br />You have successfully signed out of the website.</h4>
                    <p><Link to='/'>Click here to continue exploring the website</Link></p>
                    <br />
                    <hr />
                    <br />
                    <h5>Signed out by mistake? <Link to='/signIn'>Click here to sign back in</Link> and order online.</h5>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'SignOut'
//Pre process the container with Redux Plugins
export default Main;