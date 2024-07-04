import axios from "axios";
import { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';
import './SuccessOtp.css';
import LoginPage from "./LoginPage";

function SuccessOtp() {
    const [updatedata,setupdatedata]=useState(false);
    const [otpdata, setOtpData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username:'',
        phoneno: '',
        password: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/firstapp/successotp/');
                setOtpData(response.data);
            } catch (error) {
                alert("No data found");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.put('http://127.0.0.1:8000/firstapp/successotp/', otpdata);
            setupdatedata(true);
            alert('Data updated successfully');
            
        } catch (error) {
            alert('Failed to update data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtpData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    if(updatedata){
        return <LoginPage/>;
    }

    return (
        <div className="success">
                <label><b>Update your First name</b></label>
                <input type="text" name="first_name" value={otpdata.first_name} onChange={handleChange} placeholder="First name" /><br /><br />
                <label><b>Update your Last name</b></label>
                <input type="text" name="last_name" value={otpdata.last_name} onChange={handleChange} placeholder="Last name" /><br /><br />
                <label><b>Update Username</b></label>
                <input type="text" name="username" value={otpdata.username} onChange={handleChange} placeholder="Username" /><br /><br />
                {/*<label><b>Update your Email</b></label>
                <input type="text" name="email" value={otpdata.email} onChange={handleChange} placeholder="Email" /><br /><br />*/}
                <label><b>PhoneNo without country code</b></label>
                <input type="text" name="phoneno" value={otpdata.phoneno} onChange={handleChange} placeholder="PhoneNo" /><br /><br />
                <label><b>Update your password</b></label>
                <input type="text" name="password" value={otpdata.password} onChange={handleChange} placeholder="Password" /><br /><br />
                <center>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}</center>
        </div>
    );
};

export default SuccessOtp;