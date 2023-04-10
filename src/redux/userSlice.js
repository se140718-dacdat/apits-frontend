import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            user: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        userStart: (state) => {
            state.user.isFetching = true;
        },
        userSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.user = action.payload;
            state.user.error = false;
        },
        userFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        }
    }
});

export const {
    userStart,
    userFailed,
    userSuccess
} = userSlice.actions;

export default userSlice.reducer;