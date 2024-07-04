import axios from "axios";
import { useState,useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './FullDetails.css';
import { Button } from "react-bootstrap";
import AvailableVehicles from "./AvailableVehicles";



function FullDetails({registrationNo}){
    const [detaildata, setdetaildata] = useState([]);
    const [backclick,setbackclick]=useState(false);

    useEffect(() => {
        const fetchFullDetails = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/fulldetails/', {
                    'reg_no': registrationNo,
                });
                setdetaildata(response.data); 
            } catch (error) {
                alert('No data found');
            }
        };

        fetchFullDetails();
    }, [registrationNo]);
    if(backclick){
        return <AvailableVehicles/>
    }

    return(
        <div>
        <div className='corosol'>
        <Carousel style={{ maxWidth: '60%', maxHeight: '600px',position:'relative' }}>
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={detaildata.photo_1}
            style={{ width: '600px', height: '600px',borderRadius: '5px'}} 
            alt='Not Found'
          />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={detaildata.photo_2}
            style={{ width: '600px', height: '600px',borderRadius: '5px' }} 
            alt='Not Found'
          />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={detaildata.photo_3}
            style={{ width: '600px', height: '600px',borderRadius: '5px' }} 
            alt='Not Found'
          />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>  
        </div>
        <div className="details">
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>Company:</span>{detaildata.company}</h4>
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>Area:</span>{detaildata.area}</h4>
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>PhoneNo:</span>{detaildata.phoneno}</h4>
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>About:</span>{detaildata.Description}</h4>
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>RegistrationNo:</span>{detaildata.Registrationno}</h4>
          <h4><span style={{color:'#3C009d',fontWeight:'bold'}}>Type:</span>{detaildata.vehicle_type}</h4>
        </div>
        <div className="backbutton">
        <Button variant="primary" onClick={()=>{setbackclick(true)}}>Back</Button>{' '}
            </div>
        </div>
    );
}

export default FullDetails;