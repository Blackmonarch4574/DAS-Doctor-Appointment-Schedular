import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
        <div className="hero-img">
        <img
          src={image}
          alt="hero"
          style={{ width: '300px', height: 'auto', float: 'right' }} 
        />
</div>
          <div className="hero-content">
            <p>
            Welcome to the Doctor Appointment Scheduler, a convenient and user-friendly platform designed to streamline the process of booking appointments with healthcare professionals. Whether you're a patient seeking care or a doctor managing your practice, our app makes scheduling easier and more efficient. Our vision is to make healthcare more accessible and efficient by eliminating the hassle of traditional appointment scheduling.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
