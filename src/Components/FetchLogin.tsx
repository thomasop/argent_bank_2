import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Proptype {
  usernameInput: string;
  passwordInput: string;
  setSendForm: Dispatch<SetStateAction<boolean>>
}

const FetchLogin: React.FC<Proptype> = ({ usernameInput, passwordInput, setSendForm }) => {
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
        document.cookie = "token=" + json.body.token + "; Max-Age=900000";
        document.cookie = "message=" + json.message + "; Max-Age=900000";
        document.cookie = "status=" + json.status + "; Max-Age=900000";
      } else {
        setSendForm(false)
        let errorMessages = document.querySelector('.errorMessages')
        if (errorMessages) errorMessages.textContent = json.message
      }
    };
    login();
  }, [dispatch, navigate, passwordInput, setSendForm, usernameInput]);
  return null;
};

export default FetchLogin;
