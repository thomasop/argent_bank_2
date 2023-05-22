import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    firstName: string
    lastName: string
}

const initialState: AuthType = {
    firstName: "",
    lastName: "",
}

/**
 * Redux - Create slice for store user modification
 */
export const editUser = createSlice({
    name: 'editUser',
    initialState,
    reducers: {
        editUser: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
    }
})