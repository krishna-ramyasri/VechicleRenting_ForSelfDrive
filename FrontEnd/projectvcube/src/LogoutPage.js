import React, { useState,useContext } from 'react';
import axios from 'axios';
import './LogoutPage.css'
import LoginPage from './LoginPage';
import { AuthContext } from './AuthContext'

function LogoutButton() {
    const [isLogout, setIsLogout] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.get('http://127.0.0.1:8000/firstapp/logout/');
            setIsLogout(true);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed', error);
        }};

    if (isLogout) {
        return (<LoginPage />);
    }
    return (
        <div className="logoutcontent">
            <center>
                <h3>Are you sure you want to log out?</h3>
                <button onClick={handleLogout}>Logout</button>
            </center>
        </div>
    );
}

export default LogoutButton;