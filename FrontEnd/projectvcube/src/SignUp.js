import React, { useState } from 'react';
import './SignUp.css'; 
import axios from 'axios';
import LoginPage from './LoginPage';
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        adharImage: null,
        drivingLicenseImage: null,
    });
    const [submitted, setSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [backToLogin, setBackToLogin] = useState(false);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let truncatedValue = value;

        if (name === 'phone' && value.length > 10) {
            truncatedValue = value.slice(0, 10); 
        } else if (name === 'password' && value.length > 15) {
            truncatedValue = value.slice(0, 10); 
        }

        setFormData({
            ...formData,
            [name]: truncatedValue
        });
    };
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://127.0.0.1:8000/firstapp/signup/', {
                "first_name": formData["firstName"],
                "last_name": formData["lastName"],
                "email": formData["email"],
                "username": formData["email"],
                "password": formData["password"],
                "phoneno": formData["phone"],
                "aadharimage": formData["adharImage"],
                "licenseimage": formData["drivingLicenseImage"],
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((resp) => {
                alert("Account is created successfully");
                setSubmitted(true);
            }).catch((error) => {
                alert("Something went wrong or Account details already exist in our database");
            });
        };
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
    
        if (!formData.firstName.trim()) {
            formIsValid = false;
            errors["firstName"] = "Please enter your first name.";
        }
    
        if (!formData.lastName.trim()) {
            formIsValid = false;
            errors["lastName"] = "Please enter your last name.";
        }
    
        if (!formData.email.trim()) {
            formIsValid = false;
            errors["email"] = "Please enter your email address.";
        }
    
        if (!formData.password || formData.password.length < 8) {
            formIsValid = false;
            errors["password"] = "Password must be at least 8 characters long and not empty";
        }
        
        if (!formData.phone || ((formData.phone.length>10) || (formData.phone.length<10))){
            formIsValid = false;
            errors["phone"] = "Please enter a valid phone number.";
        }
    
        if (!formData.adharImage) {
            formIsValid = false;
            errors["adharImage"] = "Please upload your Aadhar image.";
        }
    
        if (!formData.drivingLicenseImage) {
            formIsValid = false;
            errors["drivingLicenseImage"] = "Please upload your Driving License image.";
        }
    
        if (!isChecked) {
            formIsValid = false;
            errors["isChecked"] = "Please accept our terms and conditions.";
        }
        
        setErrors(errors);
        return formIsValid;
    };

    if (submitted) {
        return <LoginPage />;
    }

    if (backToLogin) {
        return <LoginPage />;
    }

    return (
        <div className="sign-up-container">
            <div className="backbutton">
                <FaArrowLeft />
                <strong><span onClick={()=>{setBackToLogin(true)}}>Back</span></strong>
            </div>
            <div className="form-container">
                <center>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                            <span className="error">{errors["firstName"]}</span>
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                            <span className="error">{errors["lastName"]}</span>
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                            <span className="error">{errors["email"]}</span>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                            <span className="error">{errors["password"]}</span>
                            <input type="tel" name="phone" placeholder="Enter PhoneNo without +91" value={formData.phone} onChange={handleInputChange} />
                            <span className="error">{errors["phone"]}</span>
                            <label>Aadhar:</label>
                            <input type="file" name="adharImage" accept="image/*" onChange={handleFileChange} />
                            <span className="error">{errors["adharImage"]}</span>
                            <span className="error">{errors["bikeRCImage"]}</span>
                            <label>Driving License:</label>
                            <input type="file" name="drivingLicenseImage" accept="image/*" onChange={handleFileChange} />
                            <span className="error">{errors["drivingLicenseImage"]}</span>
                        </div>
                        <div id="signbutton">
                            <button type="submit">Sign Up</button><br></br>
                        </div>
                        <input type="checkbox" onChange={handleCheckboxChange} />
                        <label>I accept the <a href='https://drive.google.com/file/d/1jWyqTlBvuHBNcaeiXyr2S4PI74QPXuuv/view?usp=drive_link'>terms and conditions</a></label>
                        <span className="error">{errors["isChecked"]}</span>
                    </form>
                </center>
            </div>
        </div>
    );
};

export default SignUp;

