import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Main = () => {
    return (
        <>
            <footer className='footer_section'>
                <div className='footer_detail'>
                    <div className="logo_section">
                        <img className='brandLogoFooter' src="ElivorBrandLogo6_2.jpg" alt="Brand-Logo" />
                    </div>
                    {/* <h1>
                        <LockIcon /> Brand
                    </h1> */}
                    <ul>
                        {/* <li><Link to='/'>Home</Link></li>
                        <li><Link to='/productsList'>Products</Link></li>
                        <li><Link to='/allCategories'>Categories</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contactUs'>Contact Us</Link></li> */}
                    </ul>
                    <div className='footer_social'>
                        <a href='https://www.facebook.com'>
                            <FacebookIcon />
                        </a>
                        <a href='https://www.twitter.com'>
                            <TwitterIcon />
                        </a>
                        <a href='https://www.linkedin.com'>
                            <LinkedInIcon />
                        </a>
                        <a href='https://www.instagram.com'>
                            <InstagramIcon />
                        </a>
                        <h2>|</h2>
                        <a href='https://maps.google.com'>
                            <LocationOnIcon />
                        </a>
                        <a href='https://www.google.com'>
                            <PhoneIcon />
                        </a>
                        <a href='https://www.gmail.com'>
                            <EmailIcon />
                        </a>
                    </div>
                </div>
                <div className='footer_info'>
                    <p>
                        &copy;2022. All Rights Reserved By <img className='brandLogoCopyright' src="ElivorBrandLogo7_2.jpg" alt="Brand-Logo" />
                    </p>
                </div>
            </footer>
        </>
    )
}

Main.displayName = 'Footer'
//Pre process the container with Redux Plugins
export default Main
