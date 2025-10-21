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
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = null;
    },
    addJoinGroup: (state, action) => {
      state.user.joinedGroups = [...state.user.joinedGroups, action.payload];
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    addMyGroup: (state, action) => {
      state.user.myGroups = [...state.user.myGroups, action.payload];
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateGroup: (state, action) => {
      const groupIndex = state.user.joinedGroups.findIndex(
        (group) => group._id === action.payload.id
      );

      if (groupIndex !== -1) {
        const joinedGroups = structuredClone(state.user.joinedGroups);
        joinedGroups[groupIndex].groupName = action.payload.groupName;
        joinedGroups[groupIndex].description = action.payload.description;

        state.user.joinedGroups = joinedGroups;
      }
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
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  removeMyGroup: (state, action) => {
    const groupIndex = state.user.myGroups.findIndex(
      (group) => group._id === action.payload
    );

    if (groupIndex !== -1) {
      const updatedMyGroups = state.user.myGroups.filter(
        (group) => group._id !== action.payload
      );

      state.user = { ...state.user, myGroups: [...updatedMyGroups] };
    }
    localStorage.setItem("user", JSON.stringify(state.user));
  },
  setGroups: (state, action) => {
    state.user.joinedGroups = action.payload;
    localStorage.setItem("user", JSON.stringify(state.user));
  },
});

export const {
  setUser,
  clearUser,
  addJoinGroup,
  addMyGroup,
  updateGroup,
  removeGroup,
  removeMyGroup,
  setGroups,
} = userSlice.actions;
export default userSlice.reducer;
