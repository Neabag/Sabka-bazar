import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Slider from "./Slider";
import "./Home.scss";

function Home() {
  const [state, setState] = useState({
    categories: [],
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setState((prevState) => {
          return { ...prevState, categories: response.data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="sliderContent">
        <Slider />
      </div>
      <div className="productBycategory">
        {state.categories.length > 0
          ? state.categories
              .filter((category) => category.enabled === true)
              .map((category, index) => {
                return category.enabled ? (
                  <div
                    className={index % 2 === 0 ? "leftFlex" : "rightFlex"}
                    key={index}
                  >
                    <div className="categoryImg">
                      <img src={category.imageUrl} alt={category.name} />
                    </div>
                    <div className="categoryDetails">
                      <div className="categoryName">
                        <strong>{category.name}</strong>
                      </div>
                      <div className="categoryDesc">{category.description}</div>
                      <Link
                        to={"/products/" + category.id}
                        title={category.name}
                      >
                        <button className="categorExplore">
                          {"Explore " + category.name}
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
          : ""}
      </div>
    </>
  );
}

export default Home;
