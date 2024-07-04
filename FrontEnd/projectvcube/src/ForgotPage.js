import './ForgotPage.css'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';
import OtpValidation from './OtpValidation';
import LoginPage from './LoginPage';


function ForgotPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [gotosignup,setgotosignup]=useState(false);
    const senddata = () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');
        <OtpValidation />
        axios.post('http://127.0.0.1:8000/firstapp/forgot/', { 'email': email })
            .then((resp) => {
                alert("OTP is send to your Respect Email");
                setSubmitted(true);
            })
            .catch((error) => {
                alert("Something went wrong please enter valid email\uD83D\uDE15");
            });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    if (submitted) { return <OtpValidation />;}
    if(gotosignup) { return <LoginPage/>;}

    return (
        <div id="container-1">
            <center>
            <h3>Find Your Account</h3>
            <hr />
            <form>
                <p>Please enter your email address or mobile number to search <br />for your account</p>
                <input type="text" placeholder="Email address" onChange={(event) => setEmail(event.target.value)} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <hr />
                <div id='butt'>
                    <Button variant="secondary" onClick={()=>setgotosignup(true)}>Cancel</Button>{' '}
                    <Button variant="primary" onClick={senddata}>Search</Button>{' '}
                </div>
            </form>
            </center>
        </div>
    );
};


export default ForgotPage;