import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmailProvider } from './context/EmailContext';
import { EventProvider } from './context/eventContext';
import './components/Load/Load.css';
import LoadBack from './assets/event.png';
import Home from './pages/Home/Home';
import Event from './pages/Event/Event';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Detail from './pages/Detail/Detail';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import SignInComponent from './pages/KYC/SignInComponent';


function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(t => setTimeout(t, 3000));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <EmailProvider>
            <EventProvider>
                <Router>
                    {loading ? (
                        <div id="load-back">
                            <img src={LoadBack} alt="Loading" />
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/event" element={<Event />} />
                            <Route path="/kyc" element={<SignInComponent />} />
                            <Route path="/detail" element={<Detail />} />
                            <Route path="/register" element={<Register/>} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    )}
                </Router>
            </EventProvider>
        </EmailProvider>
    );
}

export default App;
