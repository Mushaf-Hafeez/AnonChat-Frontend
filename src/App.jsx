import { lazy, Suspense, useEffect, useRef } from "react";
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
import GroupManagementPage from "./pages/GroupManagementPage";
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
import GroupAdminProtectedRoute from "./pages/GroupAdminProtectedRoute";

// importing api call functions
import { getDepartments } from "./services/department";

// importing reducers
import { setDepartments } from "./redux/slices/dataSlice";
import { socket } from "./utils/socket";
import { toast } from "react-toastify";
import { MailCheck } from "lucide-react";

const App = () => {
  const { isAuth } = useSelector((state) => state.Auth);
  const { user } = useSelector((state) => state.User);
  const { selectedGroup } = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  const notificationRef = useRef();

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

  useEffect(() => {
    const handleNewMessage = (message) => {
      // notification sound
      if (message.sender._id != user._id) {
        notificationRef.current.play();
      }

      // show notification for new message
      if (!selectedGroup || selectedGroup._id != message.group._id) {
        toast.success(`New message in ${message.group.groupName}`, {
          icon: () => <MailCheck color="green" />,
        });
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [selectedGroup?._id]);

  // new feature: socket connection management
  useEffect(() => {
    // create socket connection if authenticated
    if (isAuth && user?._id) {
      socket.connect();

      if (user?.joinedGroups.length > 0) {
        socket.emit("join-room", user.joinedGroups);
      }
    }

    // disconnect socket
    return () => {
      socket.disconnect();
    };
  }, [isAuth, socket]);

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

        {/* Group management page route */}
        <Route
          path="/group/:groupId/manage"
          element={
            <Suspense fallback={<LazyLoadingPage />}>
              <GroupAdminProtectedRoute>
                <GroupManagementPage />
              </GroupAdminProtectedRoute>
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

      <audio ref={notificationRef} src="/notification.mp3"></audio>
    </main>
  );
};

export default App;
