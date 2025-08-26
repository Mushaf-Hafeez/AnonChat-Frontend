import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  sections: [],
};

const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
  },
});

export const { setDepartments, setSections } = dataSlice.actions;
export default dataSlice.reducer;
