import { Link } from "react-router-dom";
import React from "react";

import "../styles/Header.scss";
import logo from "../logo.png";
// import cartLogo from "../cart.svg";

function Header(props) {
  let cartItems = props.count;
  const keyPressHandler = (e) => {
    if (e.charCode === 13) {
      props.cart();
    }
  };
  return (
    <header className="header-wrapper">
      <div className="mainHeader">
        <div className="leftHead">
          <Link to="/" title="Sabka Bazar">
            <img className="logo" src={logo} alt="sabka bazar logo" />
          </Link>
          <nav>
            <ul className="nav">
              <li>
                <Link exact="true" to="/" title="home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products/all" title="explore all products">
                  Products
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="rightHead">
          <nav>
            <ul className="auth">
              <li>
                <Link to="/login" title="signIn">
                  SignIn
                </Link>
              </li>
              <li>
                <Link to="/signUp" title="register yourself">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <div className="cartLogo">
            <div
              title="Open Cart"
              className="cartDiv"
              onClick={props.cart}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                keyPressHandler(e);
              }}
            >
              <svg
                version="1.1"
                viewBox="0 0 24 24"
                style={{ fill: "#b90e3fd9", width: "30px" }}
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span>{cartItems + " Items"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
