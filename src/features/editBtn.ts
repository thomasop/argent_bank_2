import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface AuthType {
    display: boolean
}

const initialState: AuthType = {
    display: false,
}

/**
 * Redux - Create slice for edit user button
 */
export const editBtn = createSlice({
    name: 'editBtn',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.display = !state.display
        },
        Purge: (state, action) => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => {
          return initialState;
        });
      },
})
