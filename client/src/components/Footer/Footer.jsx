import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const navi = useNavigate();
    return (
        <>
            <div id="Footer">
                <div id="foot1">
                    <div id='f1'>
                        <h3 >Event info</h3>
                        <p onClick={() => { navi('../event') }}>Upcoming Events </p>
                        <p onClick={() => { navi('../event') }}>Book Tickets </p>
                    </div>
                    <div id='f2'>
                        <h3>Customer Info</h3>
                        <p onClick={() => { navi('../event') }}>About Event</p>
                        <p onClick={() => { navi('../event') }}>Help & support</p>
                        <p onClick={() => { navi('../event') }}>FAQ</p>
                    </div>
                    <div id='f3'>
                        <h3>Policies</h3>
                        <p onClick={() => { navi('../event') }}>Privacy & Policy</p>

                    </div>
                    <div id='f4'>
                        <h3>Social media</h3>
                        <p>Facebook</p>
                        <p>Instagram</p>
                        <p>Youtube</p>
                    </div>
                </div>
                <div id="foot2">
                    <h3>Event @ All Rights Reserved</h3>
                </div>
            </div>
        </>
    )
}

export default Footer;