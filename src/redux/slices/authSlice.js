import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services";

const initialState = {
  isAuth: false,
  isAuthLoading: false,
};

export const checkAuth = createAsyncThunk("checkAuth", async () => {
  const response = await api.get("/auth/me");
  console.log("response is: ", response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.isAuthLoading = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.isAuth = action.payload.success;
    });
  },
});

export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
