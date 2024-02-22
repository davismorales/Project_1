import React, { useState } from "react";
import "../../App.css";
import "../Hero/HeroSection.css";
import { Button } from "../Button/Button";
import Select from "react-select";

function Players() {
  const [team, setTeam] = useState();
  const [returnData, setReturnData] = useState(null);

  const teams = [
    { value: "1", label: "Atlanta Hawks" },
    { value: "2", label: "Boston Celtics" },
    { value: "4", label: "Brooklyn Nets" },
    { value: "5", label: "Charlotte Hornets" },
    { value: "6", label: "Chicago Bulls" },
    { value: "7", label: "Cleveland Cavaliers" },
    { value: "8", label: "Dallas Mavericks" },
    { value: "9", label: "Denver Nuggets" },
    { value: "10", label: "Detroit Pistons" },
    { value: "11", label: "Golden State Warriors" },
    { value: "14", label: "Houston Rockets" },
    { value: "15", label: "Indiana Pacers" },
    { value: "16", label: "LA Clippers" },
    { value: "17", label: "Los Angeles Lakers" },
    { value: "19", label: "Memphis Grizzlies" },
    { value: "20", label: "Miami Heat" },
    { value: "21", label: "Milwaukee Bucks" },
    { value: "22", label: "Minnesota Timberwolves" },
    { value: "23", label: "New Orleans Pelicans" },
    { value: "24", label: "New York Knicks" },
    { value: "25", label: "Oklahoma City Thunder" },
    { value: "26", label: "Orlando Magic" },
    { value: "27", label: "Philadelphia 76ers" },
    { value: "28", label: "Phoenix Suns" },
    { value: "29", label: "Portland Trail Blazers" },
    { value: "30", label: "Sacramento Kings" },
    { value: "31", label: "San Antonio Spurs" },
    { value: "38", label: "Toronto Raptors" },
    { value: "40", label: "Utah Jazz" },
    { value: "41", label: "Washington Wizards" },
  ];

  async function getPlayers() {
    debugger;
    var formData = {
      team: team.value,
    };

    await fetch("/nbaApi/getPlayers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReturnData(data);
      });
  }

  return (
    <div className="hero-container">
      <Select
        onChange={(selectedOption) => setTeam(selectedOption)}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: "300px",
          }),
        }}
        options={teams}
        value={team}
      />

      <div className="hero-btns">
        <Button
          path="/players"
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={getPlayers}
        >
          Get Players
        </Button>
      </div>

      {returnData !== null && (
        <div
          class="row form-group col-md-12 col-sm-12 justify-content-center results"
          align="center"
        >
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.years}
            </label>
          </div>
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.months}
            </label>
          </div>
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.days}
            </label>
          </div>
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.hours}
            </label>
          </div>
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.minutes}
            </label>
          </div>
          <div
            class="row form-group col-md-12 col-sm-12  justify-content-center"
            align="center"
          >
            <label class="control-label justify-content-center">
              {returnData.seconds}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Players;
