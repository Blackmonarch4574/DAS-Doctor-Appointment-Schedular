import React from "react";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HealthcareChatbot from "../components/ai_assistant";

// import HomeCircles from "../components/HomeCircles";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />

      
      
      <Contact />
      <HealthcareChatbot />
      <Footer />  
    </>
  );
};

export default Home;
