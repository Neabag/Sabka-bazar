import React from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/");
  };
  let loginText = "Get access to your Orders, Wishlist and Recommendations";
  return (
    <div className="flex--row">
      <div className="page-details">
        <h1 className="page-details__heading">Login</h1>
        <p className="page-details__desc">{loginText}</p>
      </div>
      <div className="auth-form">
        <form onSubmit={submitHandler} method="POST" action="/">
          <div className="form-row flex--column">
            <input
              type="email"
              placeholder="Email"
              className="form-row__input-text"
              id="email"
              required
              name="email"
            />
            <label htmlFor="email" className="form-row__label-helper">
              Email
            </label>
          </div>
          <div className="form-row flex--column">
            <input
              type="password"
              name="password"
              id="password"
              className="form-row__input-text"
              placeholder="Password"
              required
              pattern="(?=.*\d)(?=.*[A-Za-z])(?!.*[\s]).{6,}"
              title="Must contain at least one number, one alphabet and at least 6 or more characters"
            />
            <label htmlFor="password" className="form-row__label-helper">
              Password
            </label>
          </div>
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
