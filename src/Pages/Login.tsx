import React, { useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLoginUserMutation } from "../hooks/useAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * React component - Home page
 * @return {JSX.Element}
 */
const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, result] = useLoginUserMutation();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [rememberInput, setRememberInput] = useState<boolean>(false);
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const refEmailDivError = useRef(null);
  const refPasswordDivError = useRef(null);

  const handlerEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mailregex = /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/;
    if (mailregex.test(e.target.value)) {
      handler(e, true, "", "email");
    } else if (e.target.value.length === 0) {
      handler(e, false, "", "email");
    } else {
      handler(e, false, "Email : need to be a valid email", "email");
    }
  };

  const handlerPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (regex.test(e.target.value)) {
      handler(e, true, "", "password");
    } else if (e.target.value.length === 0) {
      handler(e, false, "", "password");
    } else {
      handler(
        e,
        false,
        "Password : Need a letter in lower case, a number and 8 characters minimum",
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
      ? setEmailInput(e.target.value)
      : setPasswordInput(e.target.value);
    type === "email" ? setValidEmailInput(valid) : setValidPasswordInput(valid);
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

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validEmailInput === true && validPasswordInput === true) {
      const { data, error }: any = await loginUser({
        email: emailInput,
        password: passwordInput,
      });
      if (data && data.status === 200) {
        dispatch({
          type: "auth/storeToken",
          payload: {
            token: data.body.token,
            isLog: true,
          },
        });
        if (rememberInput === true) {
          console.log('test')
          var expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          document.cookie =
            "token=" + data.body.token + ";expires=" + expiryDate.toUTCString();
          document.cookie = "isLog=true;expires=" + expiryDate.toUTCString();
          navigate("/profil");
        } else {
          document.cookie = "token=" + data.body.token;
          document.cookie = "isLog=true";
          navigate("/profil");
        }
      } else if (error && error.status === 400) {
        console.log(data);
        console.log(error);
        let errorMessages = document.querySelector(".errorMessages");
        if (errorMessages) errorMessages.textContent = error.data.message;
      }
    } else {
      if (validEmailInput === false) {
        messageErrorSubmit(
          refEmailDivError,
          emailInput,
          "Email : need to be not empty"
        );
      }
      if (validPasswordInput === false) {
        messageErrorSubmit(
          refPasswordDivError,
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
      <Header />
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
                type="email"
                id="username"
                onChange={(e) => handlerEmailInput(e)}
                required
              />
              <div ref={refEmailDivError} className="errorMessage"></div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => handlerPasswordInput(e)}
                required
              />
              <div ref={refPasswordDivError} className="errorMessage"></div>
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
