import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import LazyLoadingPage from "./pages/LazyLoadingPage";

import { checkAuth } from "./redux/slices/authSlice";

// importing pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ChatPage from "./pages/ChatPage";
import DepartmentPage from "./pages/DepartmentPage";
import AddAdminsPage from "./pages/AddAdminsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ErrorPage from "./pages/ErrorPage";
import LazyLoadingPage from "./pages/LazyLoadingPage";
import SectionPage from "./pages/SectionPage";

// importing lazy components
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminProtectedRoute = lazy(() => import("./pages/AdminProtectedRoute"));
const StudentProtectedRoute = lazy(() =>
  import("./pages/StudentProtectedRoute")
);

// importing api call functions
import { getDepartments } from "./services/department";

// importing reducers
import { setDepartments } from "./redux/slices/dataSlice";

const App = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  // fetchDepartments function
  const fetchDepartments = async () => {
    const response = await getDepartments();

    if (response.success) {
      dispatch(setDepartments(response.departments));
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <main className="font-poppins">
      {/* routes */}
      <Routes>
        {/* Homepage route */}
        <Route
          index
          path="/"
          element={isAuth ? <ChatPage /> : <HomePage />}
        ></Route>

        {/* Login page route */}
        <Route path="/login" element={<LoginPage />}></Route>

        {/* Signup page route */}
        <Route path="/signup" element={<SignupPage />}></Route>

        {/* Verify OTP page route */}
        <Route path="/verify-otp" element={<VerifyOTPPage />}></Route>

        {/* Forgot password page route */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>

        {/* Reset password page route */}
        <Route
          path="/reset-password/:resetPasswordToken"
          element={<ResetPasswordPage />}
        ></Route>

        {/* Chat page route */}
        <Route
          path="/chat"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <StudentProtectedRoute>
                <ChatPage />
              </StudentProtectedRoute>
            </Suspense>
          }
        ></Route>

        {/* Admin login page route */}
        <Route path="/admin" element={<AdminLoginPage />}></Route>

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
        >
          <Route index element={<DepartmentPage />}></Route>
          <Route path="departments" element={<DepartmentPage />}></Route>
          <Route path="sections" element={<SectionPage />}></Route>
          <Route path="add-admins" element={<AddAdminsPage />}></Route>
        </Route>

        {/* Unauthorized page route */}
        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>

        {/* Error page route */}
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </main>
  );
};

export default App;
