import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CheckUserLog: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let cookieMessage = document.cookie.replace(
      /(?:(?:^|.*;\s*)message\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let cookieStatus = document.cookie.replace(
      /(?:(?:^|.*;\s*)status\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (
      cookieToken &&
      cookieMessage &&
      cookieStatus &&
      cookieToken.length > 0 &&
      cookieMessage.length > 0 &&
      cookieStatus.length > 0
    ) {
      dispatch({
        type: "auth/storeToken",
        payload: {
          token: cookieToken,
          message: cookieMessage,
          status: cookieStatus,
        },
      });
      navigate("/profil");
    } else {
      dispatch({
        type: "auth/storeToken",
        payload: {
          token: "",
          message: "",
          status: "",
        },
      });
      navigate("/login");
    }
  }, [dispatch, navigate]);
  return null;
};

export default CheckUserLog;
