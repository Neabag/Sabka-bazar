import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "../styles/Products.scss";

function Products(props) {
  let { categoryID } = useParams();
  const productsUrl = "http://localhost:3005/products";
  const categoryUrl = "http://localhost:3005/categories";
  const addTocartUrl = "http://localhost:3005/addTocart";
  const [state, setState] = useState({
    products: [],
    categories: [],
    allProducts: [],
    selected: "",
    windowWidth: window.innerWidth,
    enableCategory: false,
  });

  useEffect(() => {
    axios
      .get(productsUrl)
      .then((response) => {
        const products =
          categoryID === "all"
            ? response.data
            : response.data.filter((prod) => prod.category === categoryID);
        setState((prevState) => {
          return {
            ...prevState,
            products: products,
            allProducts: response.data,
            selected: categoryID,
          };
        });
      })
      .catch(function (error) {
        // manipulate the error response here
      });
    axios
      .get(categoryUrl)
      .then((response) => {
        setState((prevState) => {
          return { ...prevState, categories: response.data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [categoryID]);

  const handleResize = (e) => {
    setState((prevState) => {
      return { ...prevState, windowWidth: window.innerWidth };
    });
  };

  const filterByCategory = (id) => {
    if (state.windowWidth < 737 && state.selected === id) {
      setState((prevState) => {
        return { ...prevState, enableCategory: !prevState.enableCategory };
      });
    }
    if (id === state.selected || id === "" || id === "all") {
      setState((prevState) => {
        return {
          ...prevState,
          products: prevState.allProducts,
          selected: "all",
        };
      });
    } else {
      const products = state.allProducts;
      const filProducts = products.filter((product) => product.category === id);

      setState((prevState) => {
        return {
          ...prevState,
          products: filProducts,
          selected: id,
          enableCategory: !prevState.enableCategory,
        };
      });
    }
  };

  //Buy Now action (post request callback)
  const buyNow = (prod) => {
    function httpRequest(method, url, body) {
      return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            resolve(JSON.parse(this.responseText));
          }
        };
        xhttp.open(method, url, true);
        if (method === "POST") {
          xhttp.send(body);
        } else {
          xhttp.send();
        }
      });
    }
    httpRequest("POST", addTocartUrl, {
      id: prod.id,
    }).then((response) => {
      if (response.response === "Success") {
        props.click.call(this, 1, prod);
      }
    });
  };

  return (
    <div className="plp">
      <div className="prodCategories flex--column">
        {state.categories.length > 0
          ? state.categories.map((category, index) => {
              return category.enabled ? (
                <a
                  className={
                    state.selected === category.id
                      ? "prodCategory selected p1"
                      : state.enableCategory
                      ? "prodCategory enable p1"
                      : "prodCategory p1"
                  }
                  key={index}
                  onClick={filterByCategory.bind(this, category.id)}
                  href={"#products"}
                  title={category.title}
                >
                  {category.name}
                  <span
                    className={
                      state.selected === category.id
                        ? "prodCateMobile selected fa fa-angle-down"
                        : "prodCateMobile fa fa-angle-down"
                    }
                  ></span>
                </a>
              ) : (
                ""
              );
            })
          : ""}
      </div>
      <div className="allProducts">
        {state.products.length > 0
          ? state.products.map((product, index) => {
              return (
                <div className="product py1" key={product.id}>
                  <div className="prodName">
                    <strong>{product.name}</strong>
                  </div>
                  <div className="prodImageNdDes">
                    <div className="prodImg">
                      <img
                        src={product.imageURL}
                        alt={product.name + " image"}
                      />
                    </div>
                    {state.windowWidth < 736 ? (
                      <div className="phoneProdDes">
                        <div className="prodDesc">
                          <p title={product.description}>
                            {product.description}
                          </p>
                        </div>
                        <div className="priceDesc mt1">
                          <button
                            className="buyBtn"
                            onClick={buyNow.bind(this, product)}
                          >
                            {"Buy Now @ Rs." + product.price}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="prodDesc">
                        <p title={product.description}>{product.description}</p>
                      </div>
                    )}
                  </div>

                  {state.windowWidth > 1024 ? (
                    <div className="priceDesc mt1">
                      <div className="prodPrice">
                        {"MRP Rs." + product.price}
                      </div>
                      <button
                        className="buyBtn"
                        onClick={buyNow.bind(this, product)}
                      >
                        {"Buy Now"}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {state.windowWidth < 1025 && state.windowWidth > 736 ? (
                    <div className="priceDesc mt1">
                      {" "}
                      <button
                        className="buyBtn"
                        onClick={buyNow.bind(this, product)}
                      >
                        {"Buy Now @ Rs." + product.price}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Products;
