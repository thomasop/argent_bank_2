import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface Proptype {
  page: string;
  setLog: Dispatch<SetStateAction<boolean>> | null
}
/**
 * React component - Check if cookie exist
 * @param {Proptype} Props
 * @param {string} Props.page - get what is the current page
 * @param {Dispatch<SetStateAction<boolean>> | null} Props.setLog - edit if user is log
 * @return {null}
 */
const CheckUserLog = ({ page, setLog }: Proptype): null => {
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
      if (setLog) setLog(true)
      page === "profil"
        ? navigate("/profil")
        : page === "home"
        ? navigate("/")
        : navigate("/profil");
    } else {
      dispatch({
        type: "auth/storeToken",
        payload: {
          token: "",
          message: "",
          status: "",
        },
      });
      if (setLog) setLog(false)
      page === "home" ? navigate("/") : navigate("/login");
    }
  }, [dispatch, navigate, page, setLog]);
  return null;
};

export default CheckUserLog;
