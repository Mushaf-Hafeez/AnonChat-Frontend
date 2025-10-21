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
    updateSelectedGroup: (state, action) => {
      state.selectedGroup = {
        ...state.selectedGroup,
        groupName: action.payload.groupName,
        description: action.payload.description,
      };
    },
  },
});

export const { setIsSelected, setSelectedGroup, updateSelectedGroup } =
  groupSlice.actions;
export default groupSlice.reducer;
