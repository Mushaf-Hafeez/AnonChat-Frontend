import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services";
import { setUser } from "./userSlice";

const initialState = {
  isAuth: false,
  isAuthLoading: false,
  signupData: {},
};

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (_, { dispatch }) => {
    const response = await api.get("/auth/me");

    if (response.data.success) {
      dispatch(setUser(response.data.user));
    }
    return response.data;
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    clearSignupData: (state) => {
      state.signupData = {};
    },
    setOTPToSignupData: (state, action) => {
      state.signupData.otp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload.success;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuth = action.payload.success;
    });
  },
});

export const {
  setIsAuth,
  setIsAuthLoading,
  setSignupData,
  clearSignupData,
  setOTPToSignupData,
} = authSlice.actions;
export default authSlice.reducer;
