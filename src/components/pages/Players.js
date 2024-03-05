import React, { useState } from "react";
import "../../App.css";
import "./Players.css";
import Select from "react-select";

function Players() {
  const [team, setTeam] = useState();
  const [data, setReturnData] = useState(null);

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

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  const getPlayers = async (selectedOption) => {
    setTeam(selectedOption);

    let url = `https://api-nba-v1.p.rapidapi.com/players?team=${selectedOption.value}&season=2023`;

    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      const responseJson = JSON.parse(responseText);
      setReturnData(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="player-container">
      <h1>Select a team to check out their Roster:</h1>
      <div className="player-select">
        <Select
          onChange={(selectedOption) => getPlayers(selectedOption)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "300px",
            }),
          }}
          options={teams}
          value={team}
        />
      </div>

      {data !== null && (
        <div class="roster-container">
          <table class="roster-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>JERSEY</th>
                <th>POSITION</th>
                <th>BIRTH DATE</th>
                <th>HEIGHT</th>
                <th>WEIGHT</th>
                <th>COLLEGE</th>
              </tr>
            </thead>
            <tbody>
              {data.response.map((player) => (
                <tr key={player.id}>
                  <td>
                    {player.firstname} {player.lastname}
                  </td>
                  <td>{player.leagues.standard.jersey}</td>
                  <td>{player.leagues.standard.pos}</td>
                  <td>{player.birth.date}</td>
                  <td>
                    {player.height.feets}' {player.height.inches}
                  </td>
                  <td>{player.weight.pounds}</td>
                  <td>{player.college}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Players;
