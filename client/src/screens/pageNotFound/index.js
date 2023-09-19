import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {

    return (
        <>
            <div className="testing">
                <h1>Error: 404</h1>
                <h1>Page Not Found.</h1>
                <h4>The page you are looking for might have been removed, replaced, or is temporarily unavailable</h4>
                <h4>Go Home <Link to="/">HomePage</Link> or Sign In using your account <Link to="/signIn">Sign In</Link> </h4>
            </div>
        </>
    )
}

Main.displayName = 'PageNotFound'
//Pre process the container with Redux Plugins
export default Main
