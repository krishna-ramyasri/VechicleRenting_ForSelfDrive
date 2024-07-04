import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Envelope } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './ContactUs.css';

function ContactUs() {
  const [conname, setConName] = useState('');
  const [conphone, setConPhone] = useState('');
  const [conemail, setConEmail] = useState('');
  const [condescribe, setConDescribe] = useState('');
  const [consubmitted, setConSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    conname: '',
    conphone: '',
    conemail: '',
    condescribe: ''
  });

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!conname.trim()) {
      formIsValid = false;
      errors.conname = 'Please enter your name.';
    }

    if (!conphone.trim()) {
      formIsValid = false;
      errors.conphone = 'Please enter your phone number.';
    } else if (!/^\d+$/.test(conphone) || conphone.length !== 10) {
      formIsValid = false;
      errors.conphone = 'Please enter a valid 10-digit phone number.';
    }

    if (!conemail.trim()) {
      formIsValid = false;
      errors.conemail = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(conemail)) {
      formIsValid = false;
      errors.conemail = 'Please enter a valid email address.';
    }

    if (!condescribe.trim()) {
      formIsValid = false;
      errors.condescribe = 'Please describe your problem.';
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const confun = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('name', conname);
        formData.append('phoneno', conphone);
        formData.append('email', conemail);
        formData.append('describe', condescribe);

        const response = await axios.post('http://127.0.0.1:8000/firstapp/contact/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        });
        alert('Response Submitted successfully');
        setConSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Something went wrong');
      }
    }
  };

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    if (phoneNumber && /^\d+$/.test(phoneNumber)) {
      if (phoneNumber.length <= 10) {
        setConPhone(phoneNumber);
      }
    }
  };

  if (consubmitted) {
    return <ContactUs />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
        <div style={{ marginRight: '20px' }}>
          <Card bg="light" text="dark" style={{ width: '400px', height: '200px' }} className="mb-2">
            <center>
              <Card.Body>
                <h2>Make a Call</h2>
                <a href="tel:6301538540" style={{ textDecoration: 'none', color: 'black' }}>
                  <span style={{ fontSize: "50px" }}>&#x260E;</span>
                  <h4>6301538540</h4>
                </a>
              </Card.Body>
            </center>
          </Card>
        </div>
        <div>
          <Card bg="light" text="dark" style={{ width: '400px', height: '200px' }} className="mb-2">
            <center>
              <Card.Body>
                <h2>Send an Email</h2>
                <a href="mailto:ch.srikanth0809@gmail.com" style={{ textDecoration: 'none', color: 'black' }}>
                  <Envelope color="red" size={50} />
                  <h4>ch.srikanth0809@gmail.com</h4>
                </a>
              </Card.Body>
            </center>
          </Card>
        </div>
      </div>
      <div className={`contactcontent ${Object.values(formErrors).some(error => error) ? 'with-errors' : ''}`}>      <center>
        <h2>Report a Bug</h2>
        <p>Fields marked with an <span style={{ color: "red" }}>*</span> are required</p>
      </center>
      {formErrors.conname && <div style={{ color: 'red' }}>{formErrors.conname}</div>}
      <label style={{ fontWeight: "bold", fontSize: "large" }}>Name <span style={{ color: "red" }}>*</span></label><br />
      <input type='text' onChange={(event) => { setConName(event.target.value) }} /><br /><br />
      
      {formErrors.conphone && <div style={{ color: 'red' }}>{formErrors.conphone}</div>}
      <label style={{ fontWeight: "bold", fontSize: "large" }}>Phone <span style={{ color: "red" }}>*</span></label><br />
      <input type='text' placeholder="Don't use country code" value={conphone} onChange={handlePhoneChange} /><br /><br />
      
      {formErrors.conemail && <div style={{ color: 'red' }}>{formErrors.conemail}</div>}
      <label style={{ fontWeight: "bold", fontSize: "large" }}>Email <span style={{ color: "red" }}>*</span></label><br />
      <input type='text' onChange={(event) => { setConEmail(event.target.value) }} /><br /><br />
      
      {formErrors.condescribe && <div style={{ color: 'red' }}>{formErrors.condescribe}</div>}
      <label style={{ fontWeight: "bold", fontSize: "large" }} >Describe your Problem here <span style={{ color: "red" }}>*</span></label>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" placeholder="" onChange={(event) => { setConDescribe(event.target.value) }} style={{ height: '120px', width: '90%', border: "solid black 1px" }} rows={3} />
        </Form.Group>
      </Form>
      <center>
        <Button variant="primary" style={{ height: "50px", width: "140px" }} onClick={confun}>Submit</Button>{' '}
      </center><br/><br/>
    </div>
    </div>
  );
  }  

export default ContactUs;
