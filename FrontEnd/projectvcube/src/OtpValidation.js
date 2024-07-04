import './OtpValidation.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import SuccessOtp from './SuccessOtp';

function OtpValidation(){
    let [otp,setotp]=useState('');
    let [sucsotp,setsucsotp]=useState(false);
    
    let sendotpdata=()=>{
      if (!otp) {
         alert("Please enter the OTP.");
         return; 
     } 
     axios.post('http://127.0.0.1:8000/firstapp/otpvalidation/',{ 'otp': otp }).then((resp)=>{
        alert('OTP is validated Succesufully');
        setsucsotp(true);
     }).catch((error)=>{
        alert('Enter correct OTP\uD83D\uDE15');
     });
    }
 if(sucsotp){
    return <SuccessOtp/>;
 }
 
    return(
<div>
<div id="container">
           <center>
            <h3>Valiadate your OTP</h3>
            </center>
            <hr></hr>
            <form >
            <center>
            <input type="text" placeholder="Enter here" onChange={(event)=>setotp(event.target.value)}></input>
            <hr></hr>
            </center>
            <div id='buttons'>
            <Button variant="primary"  onClick={sendotpdata}>Submit</Button>{' '}
            </div></form>
            </div>
</div>
    );
};

export default OtpValidation;