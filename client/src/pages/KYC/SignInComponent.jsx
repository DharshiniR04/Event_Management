import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignInComponent() {
    const navi = useNavigate();
    const [hasToken, setHasToken] = useState(false);
    const CLIENT_ID = "your client id";
    const REDIRECT_URL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    const AUTH_URL = `https://www.phone.email/auth/log-in?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        const checkToken = async () => {
            if (accessToken) {
                const url = "https://eapi.phone.email/getuser";

                const payload = new FormData();
                payload.append("access_token", accessToken);
                payload.append("client_id", CLIENT_ID);

                try {
                    const response = await fetch(url, { method: "POST", body: payload });
                     await response.json();
                    setHasToken(true);
                    navi('../login');
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        checkToken();
    }, [hasToken,navi]); 

    const handle = () => {
        window.open(AUTH_URL, 'peLoginWindow', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=' + (window.screen.height - 600) / 2 + ', left=' + (window.screen.width - 500) / 2);
    };

    return (
        <div className="phem-container">
            {hasToken ? (
                <div className="phem-card">
                    <p>Success</p>
                </div>
            ) : (
                <div className="phem-card">
                    <img
                        className="phe-login-img"
                        width="250px"
                        src="https://storage.googleapis.com/prod-phoneemail-prof-images/phem-widgets/phe-signin-box.svg"
                        alt="phone email login demo"
                    />
                    <h1 style={{ margin: '10px' }}>Sign In</h1>
                    <p style={{ color: '#a6a6a6' }}>Welcome to Sign In with Phone</p>

                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '14px 20px',
                            backgroundColor: '#02BD7E',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '3px',
                            fontSize: 'inherit',
                            cursor: 'pointer',
                            maxWidth: '320px',
                            width: '100%',
                        }}
                        id="btn_ph_login"
                        name="btn_ph_login"
                        type="button"
                        onClick={handle}
                    >
                        <img
                            src="https://storage.googleapis.com/prod-phoneemail-prof-images/phem-widgets/phem-phone.svg"
                            alt="phone email"
                            style={{ marginRight: '10px' }}
                        />
                        Sign In with Phone
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignInComponent;
