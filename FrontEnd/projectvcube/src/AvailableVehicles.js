import CreatePost from './CreatePost';
import './AvailableVehicles.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from './AuthContext';
import FullDetails from './FullDetails';
import LoginPage from './LoginPage';

function AvailableVehicles() {
    let [sub, setsub] = useState(false);
    let [data, setdata] = useState([]);
    let [selectedType, setselectedType] = useState('');
    let [selectbrand, setselectbrand] = useState('');
    let [pno, setpno] = useState(1);
    let [onimg,setonimg]=useState(false);
    let perpage = 5;
    const [registrationNo, setRegistrationNo] = useState('');
    const [vehicleType, setvehicleType] = useState('');
    const { isLoggedIn } = useContext(AuthContext);

    const onfilter = async () => {
        try {
            const filterdata = await axios.post('http://127.0.0.1:8000/api/filtering/', { 'type': selectedType, 'company': selectbrand });
            setdata(filterdata.data);
        } catch (error) {
            alert('No Data Found');
        };
        setselectedType('');
        setselectbrand('');
    };

    const imageclick = (registrationNo, vehicleType) => {
        setRegistrationNo(registrationNo);
        setvehicleType(vehicleType);
        setonimg(true);
    };

       const handleChange = (event) => {
        setselectedType(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bikeResponse = await axios.get('http://127.0.0.1:8000/api/getbikepost/');
                const carResponse = await axios.get('http://127.0.0.1:8000/api/getcarpost/');
                setdata(prevData => [...bikeResponse.data, ...carResponse.data]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    if(onimg){
        return(
       <FullDetails registrationNo={registrationNo} />);
      }
      if (sub && isLoggedIn) {
        return <CreatePost />;
    } else if (sub) {
        alert('Please Login to Access Create Post\uD83D\uDE15');
        return <LoginPage />;
    } 
    
    return (
        <>
            <div className="veh">
                <center>
                    <label><b>Select Type:</b></label>
                    <select id="type" name="type" style={{ width: '30%', height: '30px',marginTop:"1%" }} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="car">car</option>
                        <option value="bike">Bike</option>
                    </select>
                    {selectedType && (
                        <>
                            &nbsp;&nbsp;<label><b>Select Brand:</b></label>
                            <select id="brand" name="brand" style={{ width: '30%', height: '30px',marginTop:"1%"  }} onChange={(event) => { setselectbrand(event.target.value) }}>
                                <option value="">Select Brand</option>
                                {selectedType === 'car' ? (
                                    <>
                                        <option value="Ford">Ford</option>
                                        <option value="Volvo">Volvo</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Kia">Kia</option>
                                        <option value="Mahindra">Mahindra</option>
                                        <option value="Maruti">Maruti</option>
                                        <option value="Renault">Renault</option>
                                        <option value="Tata">Tata</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Volkswagen">Volkswagen</option>
                                    </>
                                ) : selectedType === 'bike' ? (
                                    <>
                                        <option value="Bajaj">Bajaj</option>
                                        <option value="Hero_Motor">Hero Motor</option>
                                        <option value="Honda_Bike">Honda</option>
                                        <option value="Kawasaki">Kawasaki</option>
                                        <option value="KTM">KTM</option>
                                        <option value="Royal_Enfield">Royal Enfield</option>
                                        <option value="Suzuki">Suzuki</option>
                                        <option value="TVS_Motor">TVS Motor</option>
                                        <option value="Yamaha">Yamaha</option>
                                        <option value="OLA">OLA</option>
                                        <option value="Ather">Ather</option> 
                                    </>
                                ) : null}
                            </select>
                        </>
                    )}
                    &nbsp;&nbsp;<Button variant="success" onClick={onfilter} style={{width:'150px',height:'30px',padding:"1px",marginBottom:"6px" }} >Search</Button>
                    <Button variant="success" onClick={() => { setsub(true) }} style={{float:"right",width:"150px",marginRight:"4%",marginTop:"1%",height:'30px',padding:"1px"}}>Create Post</Button>{' '}
                </center><br /><br />

                {data.length === 0 && <h2>No vehicles are available for rent 😕</h2>}
                {data.slice(pno * perpage - perpage, pno * perpage).map((obj) => {
                    return (
                        <Card key={obj.id} style={{ width: '18rem', height: '400px', float: 'left', marginLeft: '1%', marginBottom: '15px' }}>
                            <Card.Img variant="top" onClick={() => imageclick(obj.Registrationno)} src={obj.photo_1} style={{ height: "280px" }} />
                            <Card.Body>
                                <Card.Title>Company:{obj.company}</Card.Title>
                                <Card.Text>
                                    <b>Location:</b>{obj.area}<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div><br />
            <div className='avibuttons' style={{fontSize:"x-large"}}>
                <center>
                <Button variant='info' onClick={() => { setpno(prevpage => prevpage - 1) }} disabled={pno === 1}>Previous</Button>{' '}          
                <span className={pno === 1 ? 'currentPage' : ''} onClick={() => { setpno(1) }}>1</span>&nbsp;&nbsp;
                <span className={pno === 2 ? 'currentPage' : ''} onClick={() => { setpno(2) }}>2</span>&nbsp;&nbsp;
                <span className={pno === 3 ? 'currentPage' : ''} onClick={() => { setpno(3) }}>3</span>&nbsp;&nbsp;
                <span className={pno === 4 ? 'currentPage' : ''} onClick={() => { setpno(4) }}>4</span>&nbsp;&nbsp;
                <span className={pno === 5 ? 'currentPage' : ''} >5</span>&nbsp;&nbsp;
                <span className={pno === 6 ? 'currentPage' : ''} >6</span>&nbsp;&nbsp;
                <span className={pno === 7 ? 'currentPage' : ''} >7</span>&nbsp;&nbsp;
                <span className={pno === 8 ? 'currentPage' : ''} >8</span>&nbsp;&nbsp;
                <span className={pno === 9 ? 'currentPage' : ''} >9</span>&nbsp;&nbsp;
                <span className={pno === 10 ? 'currentPage' : ''} >10</span>&nbsp;&nbsp;

          <Button variant='info' onClick={() => { setpno(prevpage => prevpage + 1) }} disabled={data.length <= pno * perpage}>Next</Button>
                </center>
            </div>
        </>
    );
};

export default AvailableVehicles;
