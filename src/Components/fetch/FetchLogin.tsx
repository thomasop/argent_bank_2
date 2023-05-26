import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Proptype {
  usernameInput: string;
  passwordInput: string;
  rememberInput: boolean;
  setSendForm: Dispatch<SetStateAction<boolean>>;
}

/**
 * React component - Fetch API for check user and login
 * @param {Proptype} Props
 * @param {string} Props.usernameInput - get username input for login
 * @param {string} Props.passwordInput - get password input for login
 * @param {boolean} Props.rememberInput - get remember input for save expiration date cookie or not
 * @param {Dispatch<SetStateAction<boolean>>} Props.setSendForm - if error set false for not resend form
 * @return {null}
 */
const FetchLogin = ({
  usernameInput,
  passwordInput,
  setSendForm,
  rememberInput,
}: Proptype): null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      let response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usernameInput,
          password: passwordInput,
        }),
      });
      let json = await response.json();
      if (json.status === 200) {
        if (rememberInput === true) {
          var expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          document.cookie =
            "token=" + json.body.token + ";expires=" + expiryDate.toUTCString();
          document.cookie =
            "message=" + json.message + ";expires=" + expiryDate.toUTCString();
          document.cookie =
            "status=" + json.status + ";expires=" + expiryDate.toUTCString();
          navigate("/profil");
        } else {
          document.cookie = "token=" + json.body.token;
          document.cookie = "message=" + json.message;
          document.cookie = "status=" + json.status;
          navigate("/profil");
        }
      } else {
        setSendForm(false);
        let errorMessages = document.querySelector(".errorMessages");
        if (errorMessages) errorMessages.textContent = json.message;
      }
    };
    login();
  }, [
    dispatch,
    navigate,
    passwordInput,
    rememberInput,
    setSendForm,
    usernameInput,
  ]);
  return null;
};

export default FetchLogin;
