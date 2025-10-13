import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import dataReducer from "../slices/dataSlice";
import groupReducer from "../slices/groupSlice";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    User: userReducer,
    Data: dataReducer,
    Group: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["Group/setSocket"],
        ignoredPaths: ["Group.socket"],
      },
    }),
});
