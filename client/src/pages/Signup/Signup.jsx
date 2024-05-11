import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import Video from '../../assets/logsin.mp4';

function Signup() {
  const navi = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      fname: e.target.elements.fname.value,
      phone: e.target.elements.phone.value,
      email: e.target.elements.email.value,
      pass: e.target.elements.pass.value
    }
    try {
      const response = await axios.post("http://localhost:3000/signup", { fname: data.fname, phone: data.phone, email: data.email, pass: data.pass });
      console.log(response);
      if (response.data === "Success") {
        alert("Success");
        navi("../kyc");
      }
      else if(response.data=== "Already an user"){
        alert("Already an user");
        navi("../login");
      }
      else {
        alert("Failed");
      }
    }
    catch (err) {
      console.log("Error in Signup: " + err);
    }
  }
  return (
    <>
      <div id="Signup">
        <div id="sign1">
          <video autoPlay muted loop>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <div id="sign2">
        <button id="btn" onClick={()=>{navi('../')}}>Back</button>
          <form action="" onSubmit={handleSignup}>
            <label>Name: </label>
            <input type="text" name="fname" /><br />
            <label>Phone No: </label>
            <input type="text" name="phone" /><br />
            <label>Email: </label>
            <input type="text" name="email" /><br />
            <label>Password: </label>
            <input type="password" name="pass" /><br />
            <button type="submit">Create</button>
          </form>
          <p id="log">Already have an account ? <span onClick={() => { navi('../login') }}>Login</span></p>
          
        </div>
      </div>
    </>
  );
}

export default Signup;