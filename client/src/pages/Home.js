import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  const [theme, setTheme] = useState("light");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state

    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  });
  return (
    <div  className="home">
      <div className="jumbo  jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className=" jumbo text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <span className={theme === "dark" ? "texts" : "text"}>
          New Arrivals
        </span>
      </h4>
      <NewArrivals />

      <h4 className="jumbo text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <span className={theme === "dark" ? "texts" : "text"}>
          Best Sellers
        </span>
      </h4>
      <BestSellers />

      <h4 className=" jumbo text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <span className={theme === "dark" ? "texts" : "text"}> Categories</span>
      </h4>
      <CategoryList />

      <h4 className="jumbo text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <span className={theme === "dark" ? "texts" : "text"}>
          {" "}
          Sub Categories
        </span>
      </h4>
      <SubList />

      <br />
      <br />
    </div>
  );
};

export default Home;
