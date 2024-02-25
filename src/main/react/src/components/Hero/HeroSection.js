import React from "react";
import "./HeroSection.css";
import "../../App.css";
import { Button } from "../Button/Button";

function HeroSection() {
  return (
    <div className="hero-container">
      <video
        src={require("../../assets/videos/ja_dunks.mp4")}
        autoPlay
        loop
        muted
      />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          path="/"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          path="/"
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
