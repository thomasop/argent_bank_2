import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import Logout from "../Components/Logout";
import EditUser from "../Components/EditUser";
import { useGetProfileMutation } from "../hooks/useAPI";

/**
 * React component - Home page
 * @return {JSX.Element}
 */
const Profil = (): JSX.Element => {
  const dispatch = useDispatch();
  const [getUserData, result] = useGetProfileMutation();
  const { firstName, lastName } = useSelector((state: RootState) => state.user);
  const { isLog } = useSelector((state: RootState) => state.auth);
  const { display } = useSelector((state: RootState) => state.editBtn);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    let cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let cookieIsLog = document.cookie.replace(
      /(?:(?:^|.*;\s*)isLog\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (
      !(
        cookieToken &&
        cookieIsLog &&
        cookieToken.length > 0 &&
        cookieIsLog.length > 0
      )
    ) {
      setLogout(true);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data, error }: any = await getUserData({});
      if (data.body) {
        dispatch({
          type: "user/storeUser",
          payload: {
            id: data.body.id,
            email: data.body.email,
            firstName: data.body.firstName,
            lastName: data.body.lastName,
            createdAt: data.body.createdAt,
            updatedAt: data.body.updatedAt,
          },
        });
      }
    };
    if (isLog === true) fetch();
  }, [dispatch, getUserData, isLog]);
  return (
    <>
      {logout === true && <Logout />}
      {(isLog === false && <Logout />) ||
        (isLog === true && (
          <>
            <Header />
            <main className="main bg-dark">
              <div className="header">
                <h1>
                  Welcome back
                  <br />
                  {firstName} {lastName}
                </h1>
                {(display === false && (
                  <button
                    className="edit-button"
                    onClick={() => {
                      dispatch({
                        type: "editBtn/toggle",
                      });
                    }}
                  >
                    Edit Name
                  </button>
                )) ||
                  (display === true && <EditUser />)}
              </div>
              <h2 className="sr-only">Accounts</h2>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">
                    Argent Bank Checking (x8349)
                  </h3>
                  <p className="account-amount">$2,082.79</p>
                  <p className="account-amount-description">
                    Available Balance
                  </p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                  <p className="account-amount">$10,928.42</p>
                  <p className="account-amount-description">
                    Available Balance
                  </p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">
                    Argent Bank Credit Card (x8349)
                  </h3>
                  <p className="account-amount">$184.30</p>
                  <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
            </main>
            <Footer />
          </>
        ))}
    </>
  );
};

export default Profil;
