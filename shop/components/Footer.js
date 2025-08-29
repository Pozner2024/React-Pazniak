import React from "react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="MinimalFooter">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; {currentYear} Gourmet Shop. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

