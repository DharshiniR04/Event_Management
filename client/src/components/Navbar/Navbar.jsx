import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';
import '../../components/Navbar/Navbar.css';
import Logo from '../../assets/logo.png';
import { FaUser } from 'react-icons/fa';
import { SelectedEmail } from '../../context/EmailContext';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [account, setAccount] = useState('');
  const [connected, setConnected] = useState(false); 
  const [web3, setWeb3] = useState(null);
  const navi = useNavigate();
  const{email,setEmail} =SelectedEmail();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const initWeb3 = async () => {

      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setConnected(true);
          setAccount(accounts[0]);
        }
      } else {
        console.log('MetaMask not installed');
      }
    };

    initWeb3();
  }, []);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAccount = accounts[0];
      setAccount(userAccount);
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogout(){
    setEmail("");
    navi('../');
  }
  
  function handleProfile(){
       if(email!==""){
          navi('../profile');
       }
       else{
        navi('../login');
       }
  }

  return (
    <>
      <div id="nav">
        <img src={Logo} id="logo" alt="logo"></img>
        <div id="log" onClick={handleDropdownToggle}>
          <FaUser size="25px" />
          {showDropdown && (
            <div className="dropdown-content">
              <p onClick={handleProfile}>Profile</p>
             {!connected && <p onClick={handleConnectWallet}>Connect to Wallet</p>}
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar;