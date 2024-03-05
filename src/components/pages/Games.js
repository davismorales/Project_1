import React, { useState, useEffect } from "react";
import CardItem from "../Cards/CardItem";
import "../Cards/Cards.css";
import "./Games.css";
import { DatePicker } from "antd";

const Games = () => {
  const [responseData, setResponseData] = useState([]);
  const [dateInfo, setDateInfo] = useState();
  const [cardLength, setCardLength] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasScore, setHasScore] = useState(false);

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
    getGames(null, new Date());
  }, []);

  const getGames = async (selectedDate, dateString) => {
    setIsLoading(true);
    let date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    let formattedDateWithOrdinal = formatDateForHeader(date);
    date.setDate(date.getDate() + 1);
    let correctedDate = date.toISOString().split('T')[0];

    let url = `https://api-nba-v1.p.rapidapi.com/games?date=${correctedDate}`;

    try {
      const response = await fetch(url, options);
      const responseText = await response.text();
      const responseJson = JSON.parse(responseText);
      setResponseData(responseJson.response);
      debugger
      if(responseJson.length === 0)
        setDateInfo(`No Games Scheduled for ${formattedDateWithOrdinal}`);
      else if(responseJson.length === 1)
        setCardLength(1);
      else if(responseJson.length === 2)
        setCardLength(2)
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false)
  };

  function formatDateForHeader(date) {
    let dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    let dateString = date.toLocaleDateString('en-US', dateOptions);
    let day = date.getDate();
    let dayWithOrdinal = day + (day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    let formattedDateWithOrdinal = dateString.replace(`${day}`, `${dayWithOrdinal}`);

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if(today > date){
      setDateInfo(`Game Results from ${formattedDateWithOrdinal}`);
      setHasScore(true);
    }
    else {
      setDateInfo(`Upcoming Slate of Games for ${formattedDateWithOrdinal}`);
      setHasScore(false);
    }
    return formattedDateWithOrdinal;
  }

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
        <h1>{dateInfo}</h1>
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
                  {responseData.length !== 0 && (
                    chunkArray(responseData, cardLength).map((chunk, index) => (
                      <ul className="cards__items" key={index}>
                        {chunk.map((item, innerIndex) => (
                          <CardItem
                            key={innerIndex}
                            src={require(`../../assets/images/${item.teams.visitors.nickname}.jpg`)}
                            additionalSrc={require(`../../assets/images/${item.teams.home.nickname}.jpg`)}
                            text={`${item.teams.visitors.nickname} @ ${item.teams.home.nickname}`}
                            label={item.scores.visitors.points}
                            additionalLabel={item.scores.home.points}
                            hasScore={hasScore}
                          />
                        ))}
                      </ul>
                    ))
                  )}
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
