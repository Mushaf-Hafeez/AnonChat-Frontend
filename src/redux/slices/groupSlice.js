import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelected: false,
  selectedGroup: null,
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
  },
});

export const { setIsSelected, setSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;
