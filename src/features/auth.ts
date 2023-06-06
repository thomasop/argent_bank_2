import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface AuthType {
    token: string
    isLog: boolean
}

const initialState: AuthType = {
    token: "",
    isLog: false,
}

/**
 * Redux - Create slice for user athentification
 */
export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeToken: (state, action) => {
            state.token = action.payload.token
            state.isLog = action.payload.isLog
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
