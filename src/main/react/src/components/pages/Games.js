import React, { useState, useEffect } from "react";
import CardItem from "../Cards/CardItem";
import "../Cards/Cards.css";

const Games = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    // Assuming responseData is fetched from an API
    // Replace this with your API call logic
    const fetchData = async () => {
      const response = await fetch("/nbaApi/getTomorrowGames");
      const data = await response.json();
      console.log(data);
      setResponseData(data.response);
    };

    fetchData();
  }, []);

  // Function to chunk the responseData into arrays of size 3
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  return (
    <>
      <div className="cards">
        <h1>Tomorrow's Slate of Games</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            {chunkArray(responseData, 3).map((chunk, index) => (
              <ul key={index} className="cards__items">
                {chunk.map((item, innerIndex) => (
                  <CardItem
                    key={innerIndex} // Ensure each item has a unique key
                    src={item.src} // Use item properties from your response
                    text={`${item.teams.visitors.nickname} @ ${item.teams.home.nickname}`}
                    label={`${item.arena.city}, ${item.arena.state}`}
                    path={item.path}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
