import './DashBoard.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import dasbordimage from './images/dashboardimage.png'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Dbfulldetails from './Dbfulldetails';

function DashBoard() {
  const { userData } = useContext(AuthContext);
  const [dashdata, setdashdata] = useState();
  const [carclcik,setcarclick] = useState(false);
  const [bikeclcik,setbikeclick] = useState(false);
  const [totalclick,settotalclick] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/firstapp/dashboard/', {
          'email': userData.email,
        });
        setdashdata(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
  
    if(userData.email) {
      getdata();
    }
  }, [userData.email]);
  
  if(carclcik){
    return <Dbfulldetails currentuser={userData.email} vtype='car'/>;
  }
  if(bikeclcik){
    return <Dbfulldetails currentuser={userData.email} vtype='bike'/>;
  }
  if(totalclick){
    return <Dbfulldetails currentuser={userData.email} vtype='totalclick'/>;
  }

  return (
    <>
      <div className="dashboard">
        <center>
          <span style={{ color: '#3C009d' }}>
            <h1>DashBoard</h1>
            <h2>Welcome, {userData.first_name}</h2>
          </span>
          <br />
        </center>
      </div>
      <div>
        <img src={dasbordimage} height={"400px"} width={"600px"} style={{ marginLeft: '30%' }} alt="Dashboard" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', cursor: 'pointer' }}>
  {dashdata && (
    <>
      <Card onClick={() => dashdata.total_cars !== 0 && setcarclick(true)} bg="light" text="dark" style={{ width: '400px', height: '200px' }} className="mb-2" disabled={dashdata.total_cars === 0}>
        <center>
          <Card.Body>
            <h2><span style={{ color: "#3C009d" }}>Cars</span></h2><hr /><br />
            <h3>{dashdata.total_cars}</h3>
          </Card.Body>
        </center>
      </Card>
      <Card onClick={() => dashdata.total_bikes !== 0 && setbikeclick(true)} bg="light" text="dark" style={{ width: '400px', height: '200px' }} className="mb-2" disabled={dashdata.total_bikes === 0}>
        <center>
          <Card.Body>
            <h2><span style={{ color: "#3C009d" }}>Bikes</span></h2><hr /><br />
            <h3>{dashdata.total_bikes}</h3>
          </Card.Body>
        </center>
      </Card>
      <Card onClick={()=> dashdata.total_vehicles !==0 && settotalclick(true)} bg="light" text="dark" style={{ width: '400px', height: '200px' }} className="mb-2" disabled={dashdata.total_vehicles === 0}>
        <center>
          <Card.Body>
            <h2><span style={{ color: "#3C009d" }}>Total Vehicles</span></h2><hr /><br />
            <h3>{dashdata.total_vehicles}</h3>
          </Card.Body>
        </center>
      </Card>
    </>
  )}
</div>
    </>
  );
}

export default DashBoard;
