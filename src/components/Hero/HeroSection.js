import React from "react";
import "./HeroSection.css";
import "../../App.css";
import { Button } from "../Button/Button";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Welcome to NBA Reference!</h1>
      <p>A resource for checking out Game Scores and Team Rosters</p>
      <div className="hero-btns">
        <Button
          path="/games"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Check out Recent Slates of Games
        </Button>
        <Button
          path="/players"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Look at Team Rosters
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
