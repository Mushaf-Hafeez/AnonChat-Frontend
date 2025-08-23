import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LazyLoadingPage from "./pages/LazyLoadingPage";

// importing reducers
import { checkAuth } from "./redux/slices/authSlice";
import DashboardPage from "./pages/DashboardPage";

// importing pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const VerifyOTPPage = lazy(() => import("./pages/VerifyOTPPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));
const AdminProtectedRoute = lazy(() => import("./pages/AdminProtectedRoute"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  const { isAuth, isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isAuthLoading) {
    return <Spinner />;
  }

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

        {/* Dashboard page route */}
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <AdminProtectedRoute>
                <DashboardPage />
              </AdminProtectedRoute>
            </Suspense>
          }
        ></Route>

        {/* Unauthorized page route */}
        <Route
          path="/unauthorized"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <UnauthorizedPage />
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
