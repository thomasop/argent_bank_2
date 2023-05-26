import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    logout: boolean | null
}

const initialState: AuthType = {
    logout: null,
}

/**
 * Redux - Create slice for store user logout
 */
export const logoutUser = createSlice({
    name: 'logoutUser',
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.logout = action.payload.logout
        }
    }
})
