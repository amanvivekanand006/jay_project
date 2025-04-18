import React from "react";
import "./Css/LandingPage.css";
import Landingnav from "./Landingnav";
import Landinghome from "./Landinghome";
import Landingabout from "./Landingabout";
import Landingblog from "./Landingblog";
import Landingcontact from "./Landingcontact";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Online Exam. All rights reserved.</p>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Landingnav/>
      <Landinghome />
      <div id="about">
      <Landingabout />
      </div>
      <div id="blog">
      <Landingblog />
      </div>
      <div id="contact">
      <Landingcontact />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

