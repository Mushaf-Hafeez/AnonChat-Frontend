import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelected: false,
  selectedGroup: null,
  socket: null,
};

const groupSlice = createSlice({
  name: "Group",
  initialState,
  reducers: {
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setIsSelected, setSelectedGroup, setSocket } =
  groupSlice.actions;
export default groupSlice.reducer;
