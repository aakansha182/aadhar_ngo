import React from "react";
import "./missionvision.css";
import MissionImage from "../../../assets/mission.jpg";

const MissionVisionPage = () => {
  return (
    <div className="mission-vision-container">
      
      
      <section className="mission">
        <h2>Our Mission</h2>
        <p>"Aadhar" is an NGO dedicated to social welfare, focusing on education, healthcare, women's empowerment, and environmental sustainability. Through grassroots interventions and advocacy, it provides access to education and healthcare, empowers women economically and socially, and promotes environmental conservation. With a community-centered approach, Aadhar aims to create lasting positive impact in marginalized communities.</p>
      </section>
      
      <section className="vision">
        <h2>Our Vision</h2>
        <p>We envision a world where marginalized communities have equal opportunities for growth and prosperity, fostering a society built on compassion, equity, and sustainability. We strive to empower individuals to reach their full potential and create a positive impact in their communities and beyond.</p>
      </section>

      <div className="image-container">
        <img src={MissionImage} alt="Mission and Vision" className="mission-vision-image" />
      </div>

      <footer className="footer">
        <p>Contact us for more information or to get involved.</p>
      </footer>
    </div>
  );
};

export default MissionVisionPage;
