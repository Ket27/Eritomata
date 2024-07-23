import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name : "User",
    initialState: {userDetails : null},
    reducers : {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice;