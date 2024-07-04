import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import ForgotPage from './ForgotPage';
import First from './First';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import OtpValidation from './OtpValidation';
import LogoutPage from './LogoutPage';
import SuccessOtp from './SuccessOtp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt, faInfoCircle, faAddressCard, faCar, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import AvailableVehicles from './AvailableVehicles';
import AboutUS from './AboutUS';
import ContactUs from './ContactUs';
import DashBoard from './DashBoard';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  return (
    <div className="App">
      <Router>
        <Navbar expand="lg" bg="info"  style={{ marginBottom: "7px", borderRadius: '5px', height: '60px', zIndex: '9999',marginTop:'5px' }} expanded={navbarExpanded} onToggle={handleNavbarToggle}>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/Home" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faHome} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/availablevehicles" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCar} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Vehicles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faInfoCircle} size="lg" color="black" />&nbsp;&nbsp;&nbsp;About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faAddressCard} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Contact Us
                  </Link>
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon icon={faTachometerAlt} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              <div className="d-flex">
                {!isLoggedIn ? (
                  <Link className="nav-link" to="/login" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faSignInAlt} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Login
                  </Link>
                ) : (
                  <Link className="nav-link" to="/logout" style={{ fontSize: '18px', color: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" color="black" />&nbsp;&nbsp;&nbsp;Logout
                  </Link>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="other-div" style={{ marginTop: navbarExpanded ? '200px' : '0' }}>
        </div>
        <Link to="/"></Link>
        <Routes>
          <Route path="/Home" element={<First />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPage />} />
          <Route path="/otpValidation" element={<OtpValidation />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/successotp" element={<SuccessOtp />} />
          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="/availablevehicles" element={<AvailableVehicles />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
