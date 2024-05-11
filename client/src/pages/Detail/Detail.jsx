import React from "react";
import { SelectedEvent } from "../../context/eventContext";
import './Detail.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function Detail(){
    const navi=useNavigate();
    const {event} = SelectedEvent();
    
    return(
        <>
         <Navbar/>
         <div className="detail-container">
                <div className="product-image">
                    <img src={event.img} alt={event.name} />
                    <p>{event.desc}</p>
                </div>
                <div className="product-details">
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Mode:</strong> {event.mode}</p>
                    <p><strong>College:</strong> {event.college}</p>
                    <p><strong>Organizer:</strong> {event.organizer}</p>
                    <p><strong>Contact:</strong> {event.contact}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Event time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>District:</strong> {event.district}</p>
                    <button id='btn' onClick={()=>{navi('../register')}}>Register</button>
                </div>
            </div>
         <Footer/>
        </>
    )
}

export default Detail;