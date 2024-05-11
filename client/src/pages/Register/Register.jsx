import React, { useState, useEffect } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { SelectedEvent } from "../../context/eventContext";
import { SelectedEmail } from "../../context/EmailContext";
import Web3 from 'web3';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import BigInt from 'big-integer';

function Register() {
    const { event } = SelectedEvent();
    const { email } = SelectedEmail();
    const [account, setAccount] = useState('');
    const [web3, setWeb3] = useState(null);
    const [Ticket, setTicket] = useState(null);
    const navi=useNavigate();
    const [registered, setRegistered] = useState(false);
    const [buttonColor, setButtonColor] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await web3Instance.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }

            } else {
                console.log('MetaMask not installed');
            }
        };

        initWeb3();
    }, []);

    async function generateHash() {
        const timestamp = Date.now().toString();
        const combinedData = `${event.eventid}${timestamp}${email.email}`;
        return CryptoJS.SHA256(combinedData).toString();
    }

    const fetchTicket = async () => {

        try {
            if (!web3) {
                console.error('Web3 not initialized');
                return;
            }
            const YOUR_CONTRACT_ADDRESS = "your_contract_address";
            const YourContractABI = "your_contract_abi";
            try{
            const contract = new web3.eth.Contract(YourContractABI, YOUR_CONTRACT_ADDRESS);
            const r1 = await contract.methods.getEventDetails(
                event.eventid
            ).call();
            const totalTickets = BigInt(r1.totalTickets);
            const ticketsSold = BigInt(r1.ticketsSold);
            setTicket(Number(totalTickets - ticketsSold));
        }
        catch(err){
            console.log(err);
        }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if(Ticket===0){
            alert("No Tickets Available");
            return
        }
        const data = {
            person: e.target.elements.person.value
        }
        const YOUR_CONTRACT_ADDRESS = "your_contract_address";
        const YourContractABI ="your_contract_abi";
        try {
            if (!web3) {
                console.error('Web3 not initialized');
                return;
            }
            const contract = new web3.eth.Contract(YourContractABI, YOUR_CONTRACT_ADDRESS);
            const balance = await web3.eth.getBalance(account);

            try {

                const person = +data.person;
                const pri = event.ticketprice * (person);
                
                const result = await contract.methods.registerPay(
                    event.eventid,
                    +data.person,
                    pri * 1e18
                ).send({ from: account, value: pri * 1e18 });

                const userhash = await generateHash();

                if (result) {
                    const res = await contract.methods.participantRegister(
                        event.eventid,
                        userhash
                    ).send({ from: account });

                    if (res) {
                        const r = await axios.post("http://localhost:3000/registeredevent", { email: email.email, participantid: userhash, eventid: event.eventid, name: event.name, time: event.time, img: event.img, person: +data.person, date: event.date, bool:"true"});

                        if (r.data==="Success") {
                            setRegistered(true);
                            setButtonColor('green');
                        }
                        else if(r.data==="Already Registered"){
                            alert("Already Registered");
                        }
                    }
                }
            }  catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Navbar />
            
            <div className="detail-container">
                <div className="product-image">
                    <img src={event.img} alt={event.name} />
                    <p>{event.desc}</p>
                </div>
                <div className="product-details">
                    <h2>{event.name}</h2>
                    <form onSubmit={handleRegister}>
                        <br />
                        <br />
                        <label>No of Persons: </label>
                        <input type="number" name="person"></input><br />
                        <br />
                        <h4><span>Price: </span>{event.ticketprice}</h4>
                        <br />
                        <button id="btn" style={{ backgroundColor: buttonColor }}>{registered ? "Registered" : "Register"}</button>  
                    </form>
                    <br />
                    <h4><span>Tickets Available: </span>{Ticket? Ticket :"Click below ⬇️"}</h4>
                    <button id="btn" onClick={fetchTicket}>Availability</button>
                    <p id="prodet" >Back to <span onClick={()=>{navi('../event')}}>Events</span></p>
                </div>
            </div>
            
            <Footer />
        </>
    )
}

export default Register;
