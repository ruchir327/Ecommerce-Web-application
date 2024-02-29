import React, { useState, useEffect } from "react";
import StarRating from "react-star-ratings";

const ShowAverage = ({ p, iscart }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme]); // Include theme as a dependency in useEffect

  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span className="text">
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />
          ({p.ratings.length}){iscart === true && <div> ({p.count}) </div>}
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default ShowAverage;
