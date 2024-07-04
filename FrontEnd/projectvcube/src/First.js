import './First.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card,Container } from 'react-bootstrap'
import { useState } from 'react';
import videoFile from './videos/Homepagevideo.mp4';
import Image from 'react-bootstrap/Image';
import imageFile from './images/homepagepart.png'

function First(){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

    return (
      <div style={{backgroundColor:'white'}}>
        <div className='corosol1'>
          <Carousel style={{ maxWidth: '100%', maxHeight: '600px', position: 'relative' }} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://files.123inventatuweb.com/49/4e/494e90c8-4c77-419a-909c-99f06b66cffb.jpg"
                style={{ width: '400px', height: '600px' }}
                alt='Not Found'
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://consumerlink.co.za/wp-content/uploads/2021/01/rent-to-buy.jpg"
                style={{ width: '400px', height: '650px' }}
                alt='Not Found'
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://content.altexsoft.com/media/2020/11/shutterstock_147619601-1.jpg"
                style={{ width: '400px', height: '600px' }}
                alt='Not Found'
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
  
        </div>
        <Container className="mt-5">
          <h2>Why Choose Us</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Wide Selection</Card.Title>
                  <Card.Text>
                    We offer a wide range of vehicles to suit your <br/>needs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Competitive Pricing</Card.Title>
                  <Card.Text>
                    Our prices are competitive with no hidden <br/>fees.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Exceptional Service</Card.Title>
                  <Card.Text>
                    Our team is dedicated to providing exceptional customer service.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
  
          <h2 className="mt-5">Customer Testimonials</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Text>
                    "The best rental service I've ever used! The cars are clean and well-maintained, and the staff is friendly and helpful." - John Doe
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Text>
                    "Booking was a breeze, and the car exceeded my expectations. Highly recommended!" <br/>- Jane Smith
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Text>
                    "Great selection of vehicles and excellent customer support. Will definitely rent from them again." - Michael Johnson
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
        <div style={{width:'90%',marginLeft:'5%'}}>
        <center>
          <Image src={imageFile} fluid />;</center>
      </div>
        <div className="video-container" >
          <center>
        <video controls style={{width:'85%',borderRadius:"10px"}}>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </center>
      </div>
      </div>
    );
}

export default First;