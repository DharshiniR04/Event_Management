import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Home() {
  const navi = useNavigate();
  return (
    <>
      <Navbar />
      <div id="front">
        <h1 id="eve">Event</h1>
        <p>Organize your events Accordingly</p>
        <button id="hbtn" onClick={()=>navi('../event')}>Explore</button>
      </div>
      <Footer />
    </>
  )
}

export default Home;