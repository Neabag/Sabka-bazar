import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./Products.scss";

function Products(props) {
  let { categoryID } = useParams();
  const productsUrl = "http://localhost:3000/products";
  const categoryUrl = "http://localhost:3000/categories";
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
    httpRequest("POST", "http://localhost:3000/addToCart", {
      id: prod.id,
    }).then((response) => {
      if (response.response === "Success") {
        props.click.call(this, 1, prod);
      }
    });
  };
  const keyPressHandler = (e, category) => {
    if (e.charCode === 13) {
      filterByCategory(category);
    }
  };

  const toggleProdcategory = () => {
    setState((prevState) => {
      return { ...prevState, enableCategory: !prevState.enableCategory };
    });
  };
  return (
    <div className="plp">
      <div className="prodCategories">
        {state.categories.length > 0
          ? state.categories.map((category, index) => {
              return category.enabled ? (
                <div
                  className={
                    state.selected === category.id
                      ? "prodCategory selected"
                      : state.enableCategory
                      ? "prodCategory enable"
                      : "prodCategory"
                  }
                  key={index}
                  role="button"
                  tabIndex="0"
                  onKeyPress={(e) => {
                    keyPressHandler(e, category.id);
                  }}
                  onClick={filterByCategory.bind(this, category.id)}
                >
                  <span>{category.name}</span>
                  <span
                    className={
                      state.selected === category.id
                        ? "prodCateMobile selected fa fa-angle-down"
                        : "prodCateMobile fa fa-angle-down"
                    }
                    onClick={toggleProdcategory}
                  ></span>
                </div>
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
                <div className="product" key={product.id}>
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
                        <div className="priceDesc">
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
                    <div className="priceDesc">
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
                    <div className="priceDesc">
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
