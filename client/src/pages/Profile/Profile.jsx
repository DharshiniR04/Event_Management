import React, { useEffect, useState } from "react";
import './Profile.css';
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SelectedEmail } from "../../context/EmailContext";
import { useNavigate } from "react-router-dom";
import qr from 'qrcode';

function Profile() {
  const navi = useNavigate();
  const [user, setUser] = useState([]);
  const { email } = SelectedEmail();
  const [qrHash, setQrHash] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (email?.[0] !== "") {
        try {
          const response = await axios.post("http://localhost:3000/user", { email: email.email });
          setUser(response.data);
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        navi('../login');
      }
    }
    fetchUserData();
  }, [email.email]);

  function handleQR(item) {
    qr.toDataURL(JSON.stringify(item.participantid), function (err, res) {
      if (err) {
        console.log(err);
      }
      else {
        setQrHash(res);
        setSelectedEvent(item);
        setVisible(true);
      }
    })
  }

  function downloadQR() {
    const link = document.createElement('a');
    link.href = qrHash;
    link.download = `${selectedEvent.name}_QR_Code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Navbar />
      <div id="profile">
        <button id="btn" >Back to <span onClick={() => { navi('../event') }}>Events</span></button>
        <p id="ma"> Hello , {email.fname}</p>
        <h1 id="reg">Registered Events</h1>
        <div id="proreg">
          <div className="box-container">
            {user.map((item, index) => (
              <div className="box" key={index}>
                <img src={item.img} alt={item.name}></img>
                <h4><span>No of Persons: </span>{item.person}</h4>
                <h4><span>Contest: </span>{item.name}</h4>
                <h4><span>Date: </span>{item.date}</h4>
                <h4><span>Time: </span>{item.time}</h4>
                <button id="btn" onClick={() => { handleQR(item) }}>View QR Code</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {visible && selectedEvent && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={() => setVisible(false)}>Close</button>
            <img src={qrHash} alt={selectedEvent.name}></img>
            <h4>{selectedEvent.name}</h4>
            <h4>{selectedEvent.time}</h4>
            <button onClick={downloadQR} id="btn">Download QR Code</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Profile;
