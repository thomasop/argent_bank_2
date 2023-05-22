import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    logout: boolean
}

const initialState: AuthType = {
    logout: false,
}

/**
 * Redux - Create slice for store user logout
 */
export const logoutUser = createSlice({
    name: 'logoutUser',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.logout = true
        }
    }
})
