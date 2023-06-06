import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { purgeStoredState } from "redux-persist";
import { persistConfig, persistor } from "../../src/utils/store";

/**
 * React component - Logout user
 * @return {null}
 */
const Logout = (): null => {
  const navigate = useNavigate();
  document.cookie = "token=; Max-Age=0";
  document.cookie = "isLog=; Max-Age=0";
  useEffect(() => {
    const test = async () => {
      await persistor.purge();
    };
    test();
  }, []);

  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default Logout;
