import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";

function App() {
  const [state, setState] = useState({
    cartCount: 0,
    cartProducts: [],
    toggleCart: false,
  });
  const cartAction = () => {
    setState((prevState) => {
      return { ...prevState, toggleCart: !prevState.toggleCart };
    });
  };
  const setCartProp = (count, prod) => {
    const prodArr = [...state.cartProducts];
    let selectedProd = state.cartProducts.find((x) => x.id === prod.id);
    if (selectedProd) {
      if (selectedProd.count + count > 0) {
        prodArr.find((x) => x.id === prod.id).count =
          selectedProd.count + count;
        setState((prevState) => {
          return {
            ...prevState,
            cartCount: prevState.cartCount + count,
            cartProducts: prodArr,
          };
        });
      } else {
        prodArr.splice(
          prodArr.findIndex((a) => a.id === prod.id),
          1
        );
        setState((prevState) => {
          return {
            ...prevState,
            cartCount: prevState.cartCount + count,
            cartProducts: prodArr,
          };
        });
      }
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          cartCount: prevState.cartCount + 1,
          cartProducts: [...prevState.cartProducts, { ...prod, count: count }],
        };
      });
    }
  };

  return (
    <>
      <Header count={state.cartCount} cart={cartAction} />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/products/:categoryID"
            render={() => <Products click={setCartProp} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
        <div
          className="cartModel"
          style={
            state.toggleCart === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Cart
            products={state.cartProducts}
            count={state.cartCount}
            toggle={state.toggleCart}
            cartClose={cartAction}
            click={setCartProp}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
