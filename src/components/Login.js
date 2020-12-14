import React from "react";
import { useHistory } from "react-router-dom";

import "./Login.scss";

function Login() {
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/");
  };
  let loginText = "Get access to your Orders, Wishlist and Recommendations";
  return (
    <div className="loginPage">
      <div className="pageDetails">
        <div className="loginHead">
          <strong>Login</strong>
        </div>
        <div className="loginDesc">{loginText}</div>
      </div>
      <div className="loginForm">
        <form onSubmit={submitHandler}>
          <div className="email">
            <label>
              Email
              <input type="text" required name="email" />
            </label>
          </div>
          <div className="password">
            <label>
              Password
              <input
                type="password"
                name="password"
                required
                pattern="(?=.*\d)(?=.*[A-Za-z])(?!.*[\s]).{6,}"
                title="Must contain at least one number, one alphabet and at least 6 or more characters"
              />
            </label>
          </div>
          <button className="loginBtn" type="submit">
            {"Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
