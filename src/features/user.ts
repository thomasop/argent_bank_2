import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface AuthType {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
}

const initialState: AuthType = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    createdAt: "",
    updatedAt: "",
}

/**
 * Redux - Create slice for store user
 */
export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
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

export const { storeUser } = user.actions