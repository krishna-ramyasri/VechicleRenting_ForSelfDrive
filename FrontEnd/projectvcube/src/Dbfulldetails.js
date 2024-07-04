import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import './Dbfulldetails.css';
import DashBoard from "./DashBoard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Dbfulldetails({currentuser,vtype}){
    const [dbdata,setdbdata]=useState([]);
    const [dbarrow,setdbarrow]=useState(false);
    const [sucdelete,setsucdelete]=useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchData = async () => {
        try {
            const dbresponse = await axios.post('http://127.0.0.1:8000/api/dbdetails/',{
                'current_user': currentuser,
                'type': vtype,
            });
            setdbdata(dbresponse.data);
        } catch(error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentuser, vtype]);
   
    const handleDelete = async () => {
        try {
            const deleteresp = await axios.post('http://127.0.0.1:8000/firstapp/deleteveh/', {
                'vehno': deleteItem,
            });
            setsucdelete(true);
            setShowConfirmation(false); 
        } catch(error) {
            console.error('Error deleting item: ', error);
        }
    };

    const ondelete = (Registrationno) => {
        setDeleteItem(Registrationno);
        setShowConfirmation(true);
    };

    if(dbarrow){
        return <DashBoard/>;
    }

    if (sucdelete) {
        return <Dbfulldetails currentuser={currentuser} vtype={vtype} />;
    }
        
    return (
        <div>
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} style={{marginTop:"100px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>No</Button>
                    <Button variant="primary" onClick={handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>

            {dbdata.length === 0 && <h2>No Data Found 😕</h2>}
            {dbdata.map((obj) => (
                <div key={obj.Registrationno}>
                    <div className="Dbarrow">
                        <span onClick={() => { setdbarrow(true) }}><FaArrowLeft />Back</span>
                    </div>
                    <Card style={{ width: '18rem', height: '460px', float: 'left', marginLeft: '1%', marginBottom: '15px', marginTop: '80px', cursor: 'pointer' }}>
                        <Card.Img variant="top" src={obj.photo_1} style={{ height: "280px" }} />
                        <Card.Body>
                            <Card.Title>Company: {obj.company}</Card.Title>
                            <Card.Text>
                                <b>Location:</b> {obj.area}<br />
                                <b>Vehicle Type:</b> {obj.vehicle_type}<br />
                                <b>Vehicle No:</b> {obj.Registrationno}<br />
                                <b>Description:</b> {obj.Description}<br />
                                <center><br/>
                                    <Button variant="primary" onClick={() => ondelete(obj.Registrationno)}>Delete</Button>{' '}
                                </center>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default Dbfulldetails;
