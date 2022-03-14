import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

function Login(props) {
  // show error message
  function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.add("error");
    small.innerText = message;
  }

  //  show success
  function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("error");
    small.innerText = "";
  }

  // check if input is empty

  function checkEmptyErr(inputList) {
    let isEmpty = false;

    inputList.forEach((input) => {
      if (input) {
        input.value = input.value.trim();
        if (!input.value) {
          isEmpty = true;
          showError(input, "Do not leave this field empty");
        } else {
          showSuccess(input);
        }
      } else {
        console.log("input empty");
      }
    });

    return isEmpty;
  }

  // check length

  function checkLengthErr(input, min, max) {
    input.value = input.value.trim();

    if (input.value.length < min) {
      showError(input, `The minimum number of letters is ${min}`);
      return true;
    }

    if (input.value.length > max) {
      showError(input, `The maximum number of letters is ${max}`);
      return true;
    }

    showSuccess(input);
    return false;
  }

  // check password confirm

  function checkPasswordErr(password, cfpassword) {
    if (password.value !== cfpassword.value) {
      showError(cfpassword, "Password is not the same");
      return true;
    }

    return false;
  }

  //  on submit

  function userLogin(e) {
    e.preventDefault();
    console.log("ok");

    const username = document.querySelector("#username");
    console.log(username);
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");

    //   check empty
    let isEmpty = checkEmptyErr([username, password, confirmPassword]);

    //   check length
    let isUsernameLengthErr = checkLengthErr(username, 8, 16);
    let isPasswordLengthErr = checkLengthErr(password, 8, 20);

    //   check password match
    let isPasswordErr = checkPasswordErr(password, confirmPassword);

    if (
      isEmpty ||
      isUsernameLengthErr ||
      isPasswordLengthErr ||
      isPasswordErr
    ) {
      //   do nothing
    } else {
      //  call api...
      alert("Your information is received");
    }
  }

  return (
    <div className="container-fluid-log">
      <div className="container-log bg-light">
        <h2 className="login-title">Login Form</h2>
        <form className="form-log">
          <div className="form-group-log">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="type your username"
              id="username"
              name="username"
            />
            <small />
          </div>

          <div className="form-group-log">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="type your password"
              id="password"
              name="password"
            />
            <small />
          </div>

          <button
            className="btn-submit"
            type="submit"
            onClick={(e) => userLogin(e)}
          >
            Submit
          </button>
        </form>
        <div className="sign-up">
          <p>Not a member?</p>
          <NavLink to={"/berserk/register"}> Click here</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
