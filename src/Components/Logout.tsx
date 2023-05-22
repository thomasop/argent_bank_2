import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * React component - Logout user
 * @return {null}
 */
const Logout = (): null => {
  const navigate = useNavigate();
  document.cookie = "token=; Max-Age=0";
  document.cookie = "message=; Max-Age=0";
  document.cookie = "status=; Max-Age=0";
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default Logout;
