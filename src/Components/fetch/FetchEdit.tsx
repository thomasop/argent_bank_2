import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";

/**
 * React component - Fetch API for edit user
 * @return {null}
 */
const FetchEdit = (): null => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { firstName, lastName } = useSelector(
    (state: RootState) => state.editUser
  );
  const { email, id, updatedAt, createdAt } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    const editData = async () => {
      let response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "put",
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      let json = await response.json();
      if (json.status === 200) {
        dispatch({
          type: "user/storeUser",
          payload: {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdAt: createdAt,
            updatedAt: json.body.updatedAt,
          },
        });
        dispatch({
          type: "editBtn/toggle",
        });
      }
    };
    editData();
  }, [createdAt, dispatch, email, firstName, id, lastName, token, updatedAt]);
  return null;
};

export default FetchEdit;
