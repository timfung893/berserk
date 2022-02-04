import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="card text-white">
      <img
        className="card-img-top"
        src="../img/bg.jpg"
        alt="background"
        width="100%"
      />
      <div className="card-img-overlay display-4 container d-flex flex-column justify-content-center">
        <h4 className="heading ">
          THE <br /> BEST <br />
          OF <br />
          <div className="heading-sub">
            <span> BERSERK</span>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default Hero;
