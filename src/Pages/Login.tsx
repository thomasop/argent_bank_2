import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FetchLogin from "../Components/fetch/FetchLogin";
import CheckUserLog from "../Components/CheckUserLog";

/**
 * React component - Home page
 * @return {JSX.Element}
 */
const Login = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [rememberInput, setRememberInput] = useState<boolean>(false);
  const [sendForm, setSendForm] = useState<boolean>(false);
  const [validTextInput, setValidTextInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);

  const handlerUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setUsernameInput(e.target.value);
      setValidTextInput(true);
      messageError(e, "");
      return true;
    } else if (e.target.value.length > 0 && e.target.value.length < 4) {
      setValidTextInput(false);
      messageError(e, "Username : min length need to be 4");
      return false;
    } else {
      setValidTextInput(false);
      messageError(e, "Username : need to be not empty");
      return false;
    }
  };

  const handlerPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z0-9]+$/;
    if (regex.test(e.target.value)) {
      setPasswordInput(e.target.value);
      setValidPasswordInput(true);
      messageError(e, "");
      return true;
    } else if (e.target.value.length === 0) {
      setValidPasswordInput(false);
      messageError(e, "Password : need to be not empty");
      return false;
    } else {
      setValidPasswordInput(false);
      messageError(
        e,
        "Password : need to be have 1 maj, 1 number and min 8 carac"
      );
      return false;
    }
  };

  const handlerRememberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberInput(e.target.checked)
  }
 
  const messageError = (
    e: React.ChangeEvent<HTMLInputElement>,
    message: string
  ) => {
    let nextHtmlElement = e.target.nextSibling as HTMLElement;
    nextHtmlElement.textContent = message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validTextInput === true && validPasswordInput) {
      setSendForm(true);
    }
  };
  return (
    <>
      {sendForm === true && (
        <FetchLogin
          usernameInput={usernameInput}
          passwordInput={passwordInput}
          setSendForm={setSendForm}
          rememberInput={rememberInput}
        />
      )}
      <CheckUserLog />
      <Header type={"nolog"} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                id="username"
                onChange={(e) => handlerUsernameInput(e)}
                required
              />
              <div className="errorMessage"></div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => handlerPasswordInput(e)}
                required
              />
              <div className="errorMessage"></div>
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={(e) => handlerRememberInput(e)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
          <div className="errorMessages"></div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
