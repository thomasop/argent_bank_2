import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";

interface Proptype {
  firstNameInput: string;
  lastNameInput: string;
}

/**
 * React component - Fetch API for edit user
 * @return {null}
 */
const FetchEdit = ({ firstNameInput, lastNameInput }: Proptype): null => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
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
          firstName: firstNameInput,
          lastName: lastNameInput,
        }),
      });
      let json = await response.json();
      if (json.status === 200) {
        dispatch({
          type: "user/storeUser",
          payload: {
            id: id,
            email: email,
            firstName: firstNameInput,
            lastName: lastNameInput,
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
  }, [
    createdAt,
    dispatch,
    email,
    firstNameInput,
    id,
    lastNameInput,
    token,
    updatedAt,
  ]);
  return null;
};

export default FetchEdit;
