import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../utils/store";

/**
 * React component - Fetch API for save user
 * @return {null}
 */
const FetchUser = (): null => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      let response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      let json = await response.json();
      if (json.status !== 200) {
        dispatch({
          type: "logoutUser/toggle",
          payload: { logout: true}
        });
      } else {
        dispatch({
          type: "logoutUser/toggle",
          payload: { logout: false}
        });
        dispatch({
          type: "user/storeUser",
          payload: {
            id: json.body.id,
            email: json.body.email,
            firstName: json.body.firstName,
            lastName: json.body.lastName,
            createdAt: json.body.createdAt,
            updatedAt: json.body.updatedAt,
          },
        });
      }
    };
    if (token.length > 0) {
      getData();
    }
  }, [dispatch, token]);
  return null;
};

export default FetchUser;
