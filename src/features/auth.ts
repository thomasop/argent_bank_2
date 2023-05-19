import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    token: string
    message: string
    status: string
}

const initialState: AuthType = {
    token: "",
    message: "",
    status: "",
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeToken: (state, action) => {
            state.token = action.payload.token
            state.message = action.payload.message
            state.status = action.payload.status
        },
        storeError: (state, action) => {
            state.token = action.payload.token
            state.message = action.payload.message
            state.status = action.payload.status
        }
    }
})
