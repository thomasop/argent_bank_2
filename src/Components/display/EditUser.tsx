import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import FetchEdit from "../fetch/FetchEdit";

/**
 * React component - Display input and button for edit user
 * @return {JSX.Element}
 */
const EditUser = (): JSX.Element => {
  const dispatch = useDispatch();
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [validFirstNameInput, setValidFirstNameInput] =
    useState<boolean>(true);
  const [validLastNameInput, setValidLastNameInput] = useState<boolean>(true);
  const { firstName, lastName } = useSelector((state: RootState) => state.user);
  const handlerFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      handler(e, "first", true, "");
    } else if (e.target.value.length === 0) {
      handler(e, "first", false, "");
    }
  };
  const handlerLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      handler(e, "last", true, "");
    } else if (e.target.value.length === 0) {
      handler(e, "last", false, "");
    }
  };

  const handler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    valid: boolean,
    message: string
  ) => {
    type === "first"
      ? setFirstNameInput(e.target.value)
      : setLastNameInput(e.target.value);
    let nextElement = e.target.nextSibling;
    if (nextElement) {
      nextElement.textContent = message;
    }
    type === "first"
      ? setValidFirstNameInput(valid)
      : setValidLastNameInput(valid);
  };

  const handlerSubmit = () => {
    if (validFirstNameInput === true && validLastNameInput === true) {
      setEditUser(true);
      setDisplayError(false);
    } else {
      setDisplayError(true);
    }
  };
  useEffect(() => {
    setFirstNameInput(firstName);
    setLastNameInput(lastName);
  }, [firstName, lastName]);
  return (
    <>
      {editUser === true && (
        <FetchEdit
          firstNameInput={firstNameInput}
          lastNameInput={lastNameInput}
        />
      )}
      <div className="editBtn">
        <div className="editBtn__flex">
          <div>
            <input
              className="editBtn__input editBtn__input--right"
              type="text"
              name="firstName"
              id="firstName"
              placeholder={firstName}
              value={firstNameInput}
              onChange={(e) => handlerFirstNameInput(e)}
            />
            <div className="errorMessage"></div>
          </div>
          <div>
            <input
              className="editBtn__input editBtn__input--left"
              type="text"
              name="lastName"
              id="lastName"
              placeholder={lastName}
              value={lastNameInput}
              onChange={(e) => handlerLastNameInput(e)}
            />
            <div className="errorMessage"></div>
          </div>
        </div>
        <div className="editBtn__flex">
          <button
            className="editBtn__btn editBtn__btn--right"
            onClick={() => handlerSubmit()}
          >
            Save
          </button>
          <button
            className="editBtn__btn editBtn__btn--left"
            onClick={() => {
              dispatch({
                type: "editBtn/toggle",
              });
            }}
          >
            Cancel
          </button>
        </div>
        {displayError === true && (
          <div className="editBtn__error">
            First name or last name cannot be null
          </div>
        )}
      </div>
    </>
  );
};

export default EditUser;
