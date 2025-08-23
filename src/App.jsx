import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LazyLoadingPage from "./pages/LazyLoadingPage";

// importing reducers
import { checkAuth } from "./redux/slices/authSlice";

// importing pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const VerifyOTPPage = lazy(() => import("./pages/VerifyOTPPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <main>
      {/* routes */}
      <Routes>
        {/* Homepage route */}
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <HomePage />
            </Suspense>
          }
        ></Route>

        {/* Login page route */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <LoginPage />
            </Suspense>
          }
        ></Route>

        {/* Signup page route */}
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <SignupPage />
            </Suspense>
          }
        ></Route>

        {/* Verify OTP page route */}
        <Route
          path="/verify-otp"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <VerifyOTPPage />
            </Suspense>
          }
        ></Route>

        {/* Forgot password page route */}
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        ></Route>

        {/* Reset password page route */}
        <Route
          path="/reset-password/:resetPasswordToken"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <ResetPasswordPage />
            </Suspense>
          }
        ></Route>

        {/* Admin login page route */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <AdminLoginPage />
            </Suspense>
          }
        ></Route>

        {/* Error page route */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <ErrorPage />
            </Suspense>
          }
        ></Route>
      </Routes>
    </main>
  );
};

export default App;
