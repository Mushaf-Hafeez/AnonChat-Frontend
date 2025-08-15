import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// importing pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

// importing components
import Spinner from "./custom_components/Spinner";

const App = () => {
  return (
    <main>
      {/* routes */}
      <Routes>
        {/* Homepage route */}
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        ></Route>

        {/* Login page route */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<Spinner />}>
              <LoginPage />
            </Suspense>
          }
        ></Route>

        {/* Signup page route */}
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Spinner />}>
              <SignupPage />
            </Suspense>
          }
        ></Route>
      </Routes>
    </main>
  );
};

export default App;
