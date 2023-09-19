import './style.scss'
import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <section className='whole_page_section'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Our Vision and Values</h1>
                        <h4>Our core values guide our actions and we aim to empower our customers, team members and partners to be a positive force on Earth. </h4>
                    </div>
                </div>
                <div className='detail_box'>
                    <div className='heading_container'>
                        <h2>
                            About Us
                        </h2>
                    </div>
                    <h3>
                        Welcome to Elivor!
                    </h3>
                    <h4>
                        Our mission as a business is ‘to offer a wide range of well-designed, comfortable, good-looking and durable products at prices so low that as many people as possible will be able to afford them’.
                        We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products.
                        <br />
                        We offer all of this while providing excellent customer service and friendly support.
                        We always keep an eye on the latest trends and put our customers’ wishes first. That is why we have satisfied customers all over the world, and are thrilled to be a part of this industry.
                        The interests of our customers are always top priority for us, so we hope you will enjoy our products as much as we enjoy making them available to you.
                    </h4>
                </div>
                <div className='why_section_row'>

                    <div className='box'>
                        <div className='img_box'>
                            <img src='support.png' alt='about_prod_image' width="60" />
                        </div>
                        <div className='box_info'>
                            <h5>
                                Award-winning support
                            </h5>
                            <p>
                                We are here for you and happy to help.
                                <br />
                                This is the place to start. Find the answers you need from our award-winning support team.
                                <br />
                                Get the help you want with 24x7 support—before, during, and after your order.
                            </p>
                            <br />
                            <Link to='/contactUs'>
                                <Button size="large" variant="contained">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='img_box'>
                            <img src='earth.png' alt='about_prod_image' width="60" />
                        </div>
                        <div className='box_info'>
                            <h5>
                                CARING FOR YOU AND OUR PLANET
                            </h5>
                            <p>
                                We want to be a force for positive change. We all have the possibility to make a significant and lasting impact - today and for the generations to come.
                                <br />
                                For many years, we have been making more from less, turning waste into resources and protecting natural resources.
                            </p>
                            <a href="https://www.wwf.org.uk/what-you-can-do/help-the-planet-2022">Learn how you can help save our planet.</a>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='img_box'>
                            <img className='freeDeliveryIcon' src='freeDel.png' alt='about_prod_image' width="60" />
                        </div>
                        <div className='box_info'>
                            <h5>
                                FREE EXPRESS DELIVERY
                            </h5>
                            <p>
                                Get unlimited free and fast delivery for every purchase you make at our site.
                                <br />
                                We offer free, safe no-contact doorstep delivery with every order no matter how big or small.
                                <br />
                                So go shopping and grab everything your heart desires.
                            </p>
                            <br />
                            <Link to="/" >
                                <Button size="large" variant="contained">Explore Shop</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

Main.displayName = 'About'
//Pre process the container with Redux Plugins
export default Main