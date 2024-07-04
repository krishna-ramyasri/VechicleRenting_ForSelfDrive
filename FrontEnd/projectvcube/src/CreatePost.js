import React, { useState, useContext } from "react";
import './CreatePost.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from "axios";
import AvailableVehicles from "./AvailableVehicles";
import Form from 'react-bootstrap/Form';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

function CreatePost() {
    const { userData } = useContext(AuthContext);
    const [iscar, setiscar] = useState(true);
    const [selectedcar, setselectedcar] = useState("");
    const [selectedbike, setselectedbike] = useState("");
    const [selectedtype, setselectedtype] = useState("");
    const [city, setcity] = useState("");
    const [Registrationno, setRegistrationno] = useState("");
    const [vehiclerc, setvehiclerc] = useState(null);
    const [image1, setimage1] = useState(null);
    const [image2, setimage2] = useState(null);
    const [image3, setimage3] = useState(null);
    const [Desc, setDesc] = useState("");
    const [cpost, setcpost] = useState(false);
    const [regphoneno, setregphoneno] = useState("");
    const [gocreatepost, setgocreatepost] = useState(false);
    const [errors, setErrors] = useState({
        selectedcar: '',
        selectedbike: '',
        city: '',
        Registrationno: '',
        regphoneno: '',
        image1:'',
        image2:'',
        image3:'',
        vehiclerc:'',
        selectedtype:'',
    });

    const handleonclick = () => {
        const newErrors = {};
        let hasErrors = false;

        if (!selectedcar && !selectedbike) {
            newErrors.selectedcar = 'Please select a vehicle brand';
            hasErrors = true;
        } else {
            newErrors.selectedcar = '';
        }
        if (!selectedtype) {
            newErrors.selectedtype = 'Please select type';
            hasErrors = true;
        } else {
            newErrors.selectedtype = '';
        }
        if (!vehiclerc) {
            newErrors.vehiclerc = 'Please Upload Vehicle RC';
            hasErrors = true;
        } else {
            newErrors.vehiclerc = '';
        }
        if (!image1) {
            newErrors.image1 = 'Please Upload Image1';
            hasErrors = true;
        } else {
            newErrors.image1 = '';
        }
        if (!image1) {
            newErrors.image2 = 'Please Upload Image2';
            hasErrors = true;
        } else {
            newErrors.image2 = '';
        }
        if (!image1) {
            newErrors.image3 = 'Please Upload Image3';
            hasErrors = true;
        } else {
            newErrors.image3 = '';
        }

        if (!city) {
            newErrors.city = 'Please enter your city';
            hasErrors = true;
        } else {
            newErrors.city = '';
        }

        if (!Registrationno) {
            newErrors.Registrationno = 'Please enter registration number';
            hasErrors = true;
        } else {
            newErrors.Registrationno = '';
        }

        if (!regphoneno) {
            newErrors.regphoneno = 'Please enter phone number';
            hasErrors = true;
        } else {
            newErrors.regphoneno = '';
        }


        setErrors(newErrors);

        if (!hasErrors) {
            const formData = new FormData();
            formData.append("company", iscar ? selectedcar : selectedbike);
            formData.append("vehicle_type", selectedtype);
            formData.append("phoneno", regphoneno);
            formData.append("area", city);
            formData.append("Registrationno", Registrationno);
            formData.append("vehicle_RC", vehiclerc);
            formData.append("photo_1", image1);
            formData.append("photo_2", image2);
            formData.append("photo_3", image3);
            formData.append("Description", Desc);
            formData.append("upload_by", userData.email);

            const url = iscar ? "http://127.0.0.1:8000/firstapp/carpost/" : "http://127.0.0.1:8000/firstapp/bikepost/";
            axios.post(url, formData)
                .then((resp) => {
                    alert("Post is created successfully");
                    setcpost(true);
                })
                .catch((error) => {
                    alert("Something went wrong or registration number already exists with us");
                });
        }
    }
    

    const bikeclick = () => {
        setiscar(false);
    }

    const carclick = () => {
        setiscar(true);
    }

    if (cpost) { return <AvailableVehicles />; }

    if (gocreatepost) { return <AvailableVehicles />; }

    return (
        <div className={`carcontent ${Object.values(errors).some(err => err !== '') ? 'error-border' : ''}`}>
            <div className="backbutton">
                <span onClick={() => { setgocreatepost(true) }}><FaArrowLeft />Back</span>
            </div>
            {iscar ? (
                <div>
                    <div className="error">{errors.selectedcar}</div>
                    <label>Car Brand:</label>
                    <select id="car" name="car" onChange={(event)=>{setselectedcar(event.target.value)}} value={selectedcar}>
            <option value="" disabled>Select Brand</option>
            <option value={"Ford"}>Ford</option>
            <option value={"Volva"}>volvo</option>
            <option value={"Honda"}>Honda</option>
            <option value={"Hyundai"}>Hyundai</option>
            <option value={"Maruti"}>Maruti</option>
            <option value={"Renault"}>Renault</option>
            <option value={"Tata"}>Tata</option>
            <option value={"Toyota"}>Toyota</option>
            <option value={"Volkswagen"}>Volkswagen</option>
            </select><br></br><br></br>
            <div className="error">{errors.selectedtype}</div>
                    <label>Type:</label>
                <select id='type' name='type' onChange={(event)=>{setselectedtype(event.target.value)}} value={selectedtype}>
                <option value="" disabled>Select Type</option>
                <option value={"Diesel"}>Diesel</option>
                <option value={"Petrol"}>Petrol</option>
                <option value={"CNG"}>CNG</option>
                <option value={"Electrical"}>Electrical</option>
            </select><br></br><br></br>
                </div>
            ) : (
                <div>
                <div className="error">{errors.selectedcar}</div>
                <label>Bike Brand:</label>
            <select id="bike" name="bike" onChange={(event)=>{setselectedbike(event.target.value)}} value={selectedbike}>
            <option value="" disabled>Select Brand</option>
            <option value={"Bajaj"}>Bajaj</option>
            <option value={"Hero_Motor"}>Hero Motor</option>
            <option value={"OLA"}>OLA</option>
            <option value={"Ather"}>Ather</option>
            <option value={"Honda"}>Honda</option>
            <option value={"Kawasaki"}>Kawasaki</option>
            <option value={"KTM"}>KTM</option>
            <option value={"Royal_Enfield"}>Royal Enfield</option>
            <option value={"Suzuki"}>Suzuki</option>
            <option value={"TVS_Motor"}>TVS Motor</option>
            <option value={"Yamaha"}>Yamaha</option>
            </select><br></br><br></br>
            <div className="error">{errors.selectedtype}</div>
            <label>Type:</label>
                <select id='type' name='type' onChange={(event)=>{setselectedtype(event.target.value)}} value={selectedtype}>
                <option value="" disabled>Select Type</option>
                <option value={"Petrol"}>Petrol</option>
                <option value={"Electrical"}>Electrical</option></select><br/><br/>
                </div>
            )}
            <div className="error">{errors.city}</div>
            <input type="text" placeholder="Enter Your city" onChange={(event)=>{setcity(event.target.value)}}/><br></br><br></br>
            <div className="error">{errors.Registrationno}</div>
            <input type="text" placeholder="Registration No" onChange={(event)=>{setRegistrationno(event.target.value)}} maxlength="10" /><br></br><br></br>
            <div className="error">{errors.regphoneno}</div>
            <input type="text" placeholder="PhoneNo with out country code" onChange={(event)=>{setregphoneno(event.target.value)}} maxlength="10" /><br></br><br></br>
            <label>Vehicle RC</label><br></br>
            <div className="error">{errors.vehiclerc}</div>
            <input type="file" name="RCphoto" accept="image/*" onChange={(event)=>{setvehiclerc(event.target.files[0])}}/><br></br>
            <label>Vehicle Images</label>
            <div className="error">{errors.image1}</div>
            <input type="file" name="pic1" accept="image/*" onChange={(event)=>{setimage1(event.target.files[0])}}/><br></br>
            <div className="error">{errors.image2}</div>
            <input type="file" name="pic2" accept="image/*" onChange={(event)=>{setimage2(event.target.files[0])}}/><br></br>
            <div className="error">{errors.image3}</div>
            <input type="file" name="Pic3" accept="image/*" onChange={(event)=>{setimage3(event.target.files[0])}}/><br></br> 
            <center><Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder="PerDayPrice and Describe your car" onChange={(event)=>setDesc(event.target.value)} style={{width:'80%',border:"solid black 1px"}} rows={3} />
            </Form.Group>                
            </Form></center>
            <ButtonGroup aria-label="Basic example" style={{width:"80%"}}>
            <Button  onClick={carclick} variant="outline-primary" className={iscar ? "active" : ""} >Cars</Button>
            <Button  onClick={bikeclick} variant="outline-primary" className={!iscar ? "active" : ""}>Bikes</Button>
            </ButtonGroup> <br/><br/>
            <Button style={{width:"80%"}} onClick={handleonclick}>Submit</Button>           
        </div>
    );
};
export default CreatePost;
