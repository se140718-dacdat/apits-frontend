import { createSlice } from "@reduxjs/toolkit";

const specialtySlice = createSlice({
    name: "specialty",
    initialState: {
        specialties: {
            specialty: null,
        },
    },
    reducers: {
        specialtySuccess: (state, action) => {
            state.specialties.specialty = action.payload;
        }
    }
});

export const {
    specialtySuccess
} = specialtySlice.actions;

export default specialtySlice.reducer;