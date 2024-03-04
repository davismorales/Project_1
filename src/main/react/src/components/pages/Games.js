import React, { useState, useEffect } from "react";
import CardItem from "../Cards/CardItem";
import "../Cards/Cards.css";

const Games = () => {
  const [responseData, setResponseData] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    // Assuming responseData is fetched from an API
    // Replace this with your API call logic
    // const fetchData = async () => {
    //   const response = await fetch("/nbaApi/getTomorrowGames");
    //   const data = await response.json();
    //   console.log(data);
    //   setResponseData(data.response);
    // };

    // fetchData();
    getGames(new Date());
  }, []);

  const getGames = async (selectedDate) => {
    setDate(selectedDate)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    let formData = {
      date: formattedDate,
    };

    await fetch("/nbaApi/getTomorrowGames", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponseData(data.response);
    });
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
      <div className="cards">
        <h1>Tomorrow's Slate of Games</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            {chunkArray(responseData, 3).map((chunk, index) => (
              <ul className="cards__items">
                {chunk.map((item, innerIndex) => (
                  <CardItem
                    src={require(`../../assets/images/${item.teams.visitors.nickname}.jpg`)}
                    additionalSrc={require(`../../assets/images/${item.teams.home.nickname}.jpg`)} // Use item properties from your response
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
    </>
  );
};

export default Games;
