import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
         Instant Health  <br />
         at Your Fingertips
        </h1>
        <p>
         Skip the wait, book your doctor easily with DAS Check your health with no delays. Find doctors online and make your appointment hassle-free. Free doctor booking service—schedule now!
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
