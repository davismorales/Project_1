import React, { useState, useEffect } from "react";
import CardItem from "../Cards/CardItem";
import "../Cards/Cards.css";
import "./Games.css";
import { DatePicker } from "antd";

const Games = () => {
  const [responseData, setResponseData] = useState([]);
  const [date, setDate] = useState();
  const [cardLength, setCardLength] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const editCard = () => {
    if (window.innerWidth <= 960) {
      setCardLength(1);
    } else {
      setCardLength(3);
    }
  };

  window.addEventListener("resize", editCard);
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    editCard();
    let date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate)
    getGames(date, formattedDate);
  }, []);

  const getGames = async (selectedDate, dateString) => {
    setIsLoading(true)
    setDate(dateString)

    let url = `https://api-nba-v1.p.rapidapi.com/games?date=${dateString}`;

    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      const responseJson = JSON.parse(responseText)
      setResponseData(responseJson.response);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false)
  };

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
      <div className="games-container">
        <h1>Game Results from {date}</h1>
        <div className="datepicker-container">
          <DatePicker onChange={getGames} />
        </div>
        <div>
          {isLoading ? (
            <div className="loader-container">
            </div>
          ) : (
            <div>
              <div className="cards__container">
                <div className="cards__wrapper">
                  {chunkArray(responseData, cardLength).map((chunk, index) => (
                    <ul className="cards__items">
                      {chunk.map((item, innerIndex) => (
                        <CardItem
                          src={require(`../../assets/images/${item.teams.visitors.nickname}.jpg`)}
                          additionalSrc={require(`../../assets/images/${item.teams.home.nickname}.jpg`)}
                          text={`${item.teams.visitors.nickname} @ ${item.teams.home.nickname}`}
                          label={item.scores.visitors.points}
                          additionalLabel={item.scores.home.points}
                          path={item.path}
                        />
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Games;
