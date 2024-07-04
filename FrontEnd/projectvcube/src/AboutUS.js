import Image from 'react-bootstrap/Image';
import myImage from './images/Logo.jpg';
import con1 from './images/aboutus_1.png';
import con2 from './images/aboutus_2.png';
import con3 from './images/aboutus_3.png';
import con4 from './images/aboutus_4.png';

function AboutUS(){
    return(
        <div style={{background:"white"}}>
        <div>
         <center>
            <img src={myImage} alt='No Image' style={{height:'500px',width:'500px',float:'left'}}></img>
            </center></div> 
            <div style={{height:"250px",border:"solid 2px black",width:"800px",marginRight:"5%",padding:'2%',marginTop:"8.4%",background:"white",float:"right",borderRadius:"5px",textAlign:"start"}}><h4>
            Welcome to our vehicle rental service!We aim to provide convenient and reliable transportation solutions for our customers.
      Our fleet includes a variety of vehicles to suit your needs, whether it's for a family vacation, business trip, or special occasion.
      Customer satisfaction is our top priority, and we strive to deliver exceptional service with every rental.</h4>
            </div>
            <div style={{padding:"3%"}}>
            <center>
          <Image src={con1} fluid />;
          <Image src={con2} fluid />;
          <Image src={con3} fluid />;
          <Image src={con4} fluid />;</center></div>
      </div>
    );
};

export default AboutUS;