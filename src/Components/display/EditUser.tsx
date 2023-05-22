import React, { useState } from "react";
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
  const [displayErrorFirst, setDisplayErrorFirst] = useState<boolean>(false);
  const [displayErrorLast, setDisplayErrorLast] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);
  const { firstName, lastName } = useSelector((state: RootState) => state.user);
  const updateFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setFirstNameInput(e.target.value);
      setDisplayErrorFirst(false);
    } else {
      setFirstNameInput(e.target.value);
      setDisplayErrorFirst(true);
    }
  };
  const updateLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setLastNameInput(e.target.value);
      setDisplayErrorLast(false);
    } else {
      setLastNameInput(e.target.value);
      setDisplayErrorLast(true);
    }
  };
  const set = () => {
    if (firstNameInput.length > 0 && lastNameInput.length > 0) {
      setEditUser(true);
      setDisplayError(false);
      dispatch({
        type: "editUser/editUser",
        payload: {
          firstName: firstNameInput,
          lastName: lastNameInput,
        },
      });
    } else {
      setDisplayError(true);
    }
  };
  return (
    <>
      {editUser === true && <FetchEdit />}
      <div className="editBtn">
        <div className="editBtn__flex">
          <input
            className="editBtn__input editBtn__input--right"
            type="text"
            name="firstName"
            id="firstName"
            placeholder={firstName}
            value={firstNameInput}
            onChange={(e) => updateFirstNameInput(e)}
          />
          <input
            className="editBtn__input editBtn__input--left"
            type="text"
            name="lastName"
            id="lastName"
            placeholder={lastName}
            value={lastNameInput}
            onChange={(e) => updateLastNameInput(e)}
          />
        </div>
        <div className="editBtn__flex">
          <button
            className="editBtn__btn editBtn__btn--right"
            onClick={() => set()}
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
        {(displayErrorLast === true && displayErrorFirst === true && (
          <div className="editBtn__error">
            First name or last name can't be null
          </div>
        )) ||
          (displayError === true && (
            <div className="editBtn__error">
              First name or last name can't be null
            </div>
          ))}
      </div>
    </>
  );
};

export default EditUser;
