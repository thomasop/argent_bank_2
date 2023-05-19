import React from "react";
import { Link } from "react-router-dom";

interface Proptype {
  type: string;
}

const Header: React.FC<Proptype> = ({ type }) => {
  const jsxRender = () => {
    if (type === "nolog") {
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
    } else if (type === "log") {
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
              Tony
            </Link>
            <a className="main-nav-item" href="./index.html">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <nav className="main-nav">{jsxRender()}</nav>
    </>
  );
};

export default Header;
