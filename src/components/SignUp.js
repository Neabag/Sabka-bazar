import React from "react";
import { useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  const submitHandler = (e) => {
    if (e.target[3].value === e.target[4].value) {
      e.preventDefault();
      history.push("/");
    } else {
      alert("Password does not match");
      e.preventDefault();
    }
  };
  let signupText = "We do not share your personal details with anyone.";
  return (
    <div className="flex--row">
      <div className="page-details">
        <h1 className="page-details__heading">Signup</h1>
        <p className="page-details__desc">{signupText}</p>
      </div>
      <div className="auth-form">
        <form onSubmit={submitHandler} method="POST" action="/">
          <div className="form-row flex--column">
            <input
              type="text"
              placeholder="First Name"
              className="form-row__input-text"
              id="fisrtName"
              required
              name="fisrtName"
            />
            <label htmlFor="fisrtName" className="form-row__label-helper">
              Fisrt Name
            </label>
          </div>
          <div className="form-row flex--column">
            <input
              type="text"
              placeholder="Last Name"
              className="form-row__input-text"
              id="lastName"
              required
              name="lastName"
            />
            <label htmlFor="lastName" className="form-row__label-helper">
              Last Name
            </label>
          </div>
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
          <div className="form-row flex--column">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-row__input-text"
              placeholder="Confirm Password"
              required
              pattern="(?=.*\d)(?=.*[A-Za-z])(?!.*[\s]).{6,}"
              title="Must contain at least one number, one alphabet and at least 6 or more characters"
            />
            <label htmlFor="confirmPassword" className="form-row__label-helper">
              Confirm Password
            </label>
          </div>
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
