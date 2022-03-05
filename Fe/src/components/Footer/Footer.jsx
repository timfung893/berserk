import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container-fluid bg-footer">
      <div className="footer text-center d-flex flex-column justify-content-center p-2">
        <p className="fw-bolder">All rights reserved - 2022 </p>
        <div className="author fw-bolder">
          <p>By Tim Fung</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
