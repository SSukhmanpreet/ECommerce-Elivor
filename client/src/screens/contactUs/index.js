import './style.scss'
import { Button, TextField } from '@mui/material';
import React from 'react'

const Main = () => {
    return (
        <>
            <section className='contactUs_page'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Get In Touch</h1>
                        <h4>We're just one click away to help you. Fill in the form to share more details about your project. Or your favorite gum flavor. Either way, we’d love to talk.</h4>
                            {/* take your brand or product from great to incredible. */}
                    </div>
                </div>
                <div className='why_section_heading'>
                    <h4>
                        Email us with any questions or inquiries. We would be happy to answer to your questions or set up a meeting with you.

                    </h4>
                </div>
                <form className='why_section'>
                    <div className='col'>
                        <div className='contactUs_form_info'>
                            <label>Enter your name</label>
                            <TextField
                                required
                                id="filled-required"
                                label="Name"
                                variant="filled"
                            />
                        </div>
                        <div className='contactUs_form_info'>
                            <label>Enter your email</label>
                            <TextField
                                required
                                id="filled-required"
                                label="Email"
                                variant="filled"
                            />
                        </div>
                        <div className='contactUs_form_info'>
                            <label>Enter the subject</label>
                            <TextField
                                required
                                id="filled-required"
                                label="Subject"
                                variant="filled"
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='contactUs_form_info'>
                            <label>What can we help you with?</label>

                            <TextField
                                id="filled-multiline-static"
                                label="Your message to us"
                                multiline
                                rows={4}
                                variant="filled"
                            />
                        </div>
                        <div className='contactUs_form_info'>
                            <Button size="large" variant="contained">Send</Button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}
Main.displayName = 'ContactUs'
//Pre process the container with Redux Plugins
export default Main