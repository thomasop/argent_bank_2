import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

/**
 * React component - Display footer
 * @return {JSX.Element}
 */
const Header = (): JSX.Element => {
  const { firstName } = useSelector((state: RootState) => state.user);
  const { isLog } = useSelector((state: RootState) => state.auth);
  const [logout, setLogout] = useState<Boolean>(false);
  const jsxRender = () => {
    if (isLog === false) {
      return (
        <>
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src="./assets/argentBankLogo.png"
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src="./assets/argentBankLogo.png"
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link className="main-nav-item" to="/profil">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link
              className="main-nav-item"
              to=""
              onClick={() => setLogout(true)}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        </>
      );
    }
  };
  return (
    <>
      {logout === true && <Logout />}
      <nav className="main-nav">{jsxRender()}</nav>
    </>
  );
};

export default Header;
