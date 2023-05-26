import React, { useRef, useState } from "react";
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
  const refInputEmail = useRef(null);
  const refInputPassword = useRef(null);

  const handlerUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      handler(e, true, "", "email");
    } else if (e.target.value.length > 0 && e.target.value.length < 4) {
      handler(e, false, "Username : min length need to be 4", "email");
    } else {
      handler(e, false, "Username : need to be not empty", "email");
    }
  };

  const handlerPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (regex.test(e.target.value)) {
      handler(e, true, "", "password");
    } else if (e.target.value.length === 0) {
      handler(e, false, "Password : need to be not empty", "password");
    } else {
      handler(
        e,
        false,
        "Password : A letter in upper case, lower case, a number and 8 characters minimum",
        "password"
      );
    }
  };

  const handler = (
    e: React.ChangeEvent<HTMLInputElement>,
    valid: boolean,
    text: string,
    type: string
  ) => {
    type === "email"
      ? setUsernameInput(e.target.value)
      : setPasswordInput(e.target.value);
    type === "email" ? setValidTextInput(valid) : setValidPasswordInput(valid);
    messageError(e, text);
    return valid;
  };

  const handlerRememberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberInput(e.target.checked);
  };

  const messageError = (
    e: React.ChangeEvent<HTMLInputElement>,
    message: string
  ) => {
    let nextHtmlElement = e.target.nextSibling as HTMLElement;
    nextHtmlElement.textContent = message;
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validTextInput === true && validPasswordInput === true) {
      setSendForm(true);
    } else {
      if (validTextInput === false) {
        messageErrorSubmit(
          refInputEmail,
          usernameInput,
          "Username : need to be not empty"
        );
      }
      if (validPasswordInput === false) {
        messageErrorSubmit(
          refInputPassword,
          passwordInput,
          "Password : need to be not empty"
        );
      }
    }
  };

  const messageErrorSubmit = (
    e: React.MutableRefObject<null>,
    input: string,
    message: string
  ) => {
    let htmlElement: HTMLElement = e.current!;
    if (input.length === 0) {
      if (htmlElement) {
        htmlElement.textContent = message;
      }
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
      <CheckUserLog page={"login"} />
      <Header type={"nolog"} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form
            onSubmit={(e) => {
              handlerSubmit(e);
            }}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                onChange={(e) => handlerUsernameInput(e)}
              />
              <div ref={refInputEmail} className="errorMessage"></div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => handlerPasswordInput(e)}
              />
              <div ref={refInputPassword} className="errorMessage"></div>
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={(e) => handlerRememberInput(e)}
              />
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
