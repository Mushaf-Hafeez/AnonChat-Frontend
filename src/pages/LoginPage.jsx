import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// importing reducers
import { setIsAuth, setIsAuthLoading } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/userSlice";

// importing Shadcn Components
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// importing custom components
import Spinner from "@/custom_components/Spinner";

// importing api call functions
import { login } from "@/services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Todo: add functionality
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const onSubmit = async ({ email, password }) => {
    const loginData = { email, password };

    dispatch(setIsAuthLoading(true));

    const response = await login(loginData);

    if (response.success) {
      // console.log("data is: ", response);
      // set to the local storage
      localStorage.setItem("isAuth", JSON.stringify(response.success));
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(setIsAuth(response.success));
      dispatch(setUser(response.user));
      toast.success("Login successful");
      reset();
      navigate("/");
    } else {
      toast.error(response.message);
      console.log("error is: ", response);
    }
    dispatch(setIsAuthLoading(false));
  };

  // Todo: uncomment the email and password patterns

  return (
    <section className="h-screen w-full col-center">
      <Card
        className={
          "w-11/12 md:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
        }
      >
        <CardHeader className={"flex-center text-center gap-4"}>
          <CardTitle className={"text-4xl font-semibold"}>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email label and input */}
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id={"email"}
                type={"email"}
                className={`${
                  errors &&
                  errors.email &&
                  "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._%+-]+@iub.edu.pk$/,
                  //   message: "Please use your university email.",
                  // },
                })}
              ></Input>
              {errors && errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password label and input */}
            <div className="space-y-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id={"password"}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors &&
                  errors.password &&
                  "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: { value: true, message: "Password is required." },
                  minLength: {
                    value: 8,
                    message: "Password must be of 8 characters.",
                  },
                  // pattern: {
                  //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
                  //   message:
                  //     "Password must contain Alphabets, Numbers and Special Characters.",
                  // },
                })}
              ></Input>

              <span
                onClick={handleToggle}
                className="absolute right-4 top-[55%]"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {errors && errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Login button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={"w-full cursor-pointer"}
            >
              {isAuthLoading && <Spinner className={"fill-white"} />}
              {!isAuthLoading && "Login"}
            </Button>

            <Button
              variant={"ghost"}
              onClick={handleForgotPassword}
              className={"cursor-pointer"}
            >
              Forgot Password?
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
