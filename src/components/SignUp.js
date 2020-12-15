import React from "react";
import { useHistory } from "react-router-dom";

import "../styles/SignUp.scss";

function SignUp() {
  const history = useHistory();
  const submitHandler = (e) => {
    if (e.target[3].value === e.target[4].value) {
      e.preventDefault();
      history.push("/");
    }
  };
  let signupText = "We do not share your personal details with anyone.";
  return (
    <div className="signUpPage">
      <div className="pageDetails">
        <div className="loginHead">
          <strong>Signup</strong>
        </div>
        <div className="loginDesc">{signupText}</div>
      </div>
      <div className="signupForm">
        <form className="" onSubmit={submitHandler}>
          <div className="fname">
            <label>
              First Name
              <input type="text" required />
            </label>
          </div>
          <div className="lname">
            <label>
              Last Name
              <input type="text" required />
            </label>
          </div>
          <div className="email">
            <label>
              Email
              <input type="text" required />
            </label>
          </div>
          <div className="password">
            <label>
              Password
              <input
                type="password"
                required
                pattern="(?=.*\d)(?=.*[A-Za-z])(?!.*[\s]).{6,}"
                title="Must contain at least one number, one alphabet and at least 6 or more characters"
              />
            </label>
          </div>
          <div className="cnfpassword">
            <label>
              Confirm Password
              <input
                type="password"
                required
                pattern="(?=.*\d)(?=.*[A-Za-z])(?!.*[\s]).{6,}"
                title="Must contain at least one number, one alphabet and at least 6 or more characters"
              />
            </label>
          </div>
          <button className="loginBtn" type="submit">
            {"Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
