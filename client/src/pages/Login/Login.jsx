import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Video from '../../assets/logsin.mp4';
import { SelectedEmail } from "../../context/EmailContext";
import './Login.css';

function Login() {
    const navi = useNavigate();
    const { setEmail } = SelectedEmail();
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.elements.email.value,
            pass: e.target.elements.pass.value
        }
        try {
            const response = await axios.post("http://localhost:3000/login", { email: data.email, pass: data.pass });
            if (response.status === 200) {
                setEmail(response.data);
                navi('../event');
            }
            else {
                alert("Invalid");
            }
        }
        catch (err) {
            console.log("Error in Login: " + err);
        }
    }
    return (
        <>
            <div id="Login">
                <div id="log1">
                    <video autoPlay muted loop>
                        <source src={Video} type="video/mp4" />
                    </video>
                </div>
                <div id="log2">
                <button id="btn" onClick={()=>{navi('../')}}>Back</button>
                    <form action="post" onSubmit={handleLogin}>
                        <label>Email: </label>
                        <input type="text" name="email"></input><br />
                        <label>Password: </label>
                        <input type="password" name="pass"></input><br />
                        <button type="submit">Login</button>
                    </form>
                    <p id="log">Don't have an account ? <span onClick={() => { navi('../signup') }}>Signup</span></p>
                </div>
            </div>
        </>
    )
}

export default Login;