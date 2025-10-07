import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    addJoinGroup: (state, action) => {
      state.user.joinedGroups = [...state.user.joinedGroups, action.payload];
    },
    addMyGroup: (state, action) => {
      state.user.myGroups = [...state.user.myGroups, action.payload];
    },
    removeGroup: (state, action) => {
      const groupIndex = state.user.joinedGroups.findIndex(
        (group) => group._id === action.payload
      );

      if (groupIndex !== -1) {
        const updatedJoindedGroups = state.user.joinedGroups.filter(
          (group) => group._id !== action.payload
        );

        state.user = { ...state.user, joinedGroups: [...updatedJoindedGroups] };
      }
    },
    setGroups: (state, action) => {
      state.user.joinedGroups = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  addJoinGroup,
  addMyGroup,
  removeGroup,
  setGroups,
} = userSlice.actions;
export default userSlice.reducer;
