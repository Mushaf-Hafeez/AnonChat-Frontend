// importing Shadcn Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// importing custom components
import Spinner from "@/custom_components/Spinner";

// importing icons
import { Eye, EyeClosed } from "lucide-react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthLoading } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { resetPassword } from "@/services/auth";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { resetPasswordToken } = useParams();

  // handleToggle function
  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // onSubmit function
  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords are not same");
      return;
    }

    // set isAuthLoading to true
    dispatch(setIsAuthLoading(true));

    // call the resetPassword api
    const response = await resetPassword(
      resetPasswordToken,
      password,
      confirmPassword
    );

    // if request is successful then show the toast with the success message, reset the form and redirect to the login page else show the toast with the error
    if (response.success) {
      toast.success(response.message);
      reset();
      navigate("/login");
    } else {
      toast.error(response.message);
    }

    // set isAuthLoading to false
    dispatch(setIsAuthLoading(false));
  };

  return (
    <section className="h-screen w-full col-center">
      <Card
        className={
          "w-11/12 md:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
        }
      >
        <CardHeader className={"flex-center text-center gap-4"}>
          <CardTitle className={"text-4xl font-semibold"}>
            Reset Password
          </CardTitle>
          <CardDescription>Reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
                    message:
                      "Password must contain Alphabets, Numbers and Special Characters.",
                  },
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

            {/* confirmPassword label and input */}
            <div className="space-y-4 relative">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id={"confirm-password"}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors &&
                  errors.confirmPassword &&
                  "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                }`}
                placeholder="Enter confirm password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required.",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be of 8 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
                    message:
                      "Password must contain Alphabets, Numbers and Special Characters.",
                  },
                })}
              ></Input>

              <span
                onClick={handleToggle}
                className="absolute right-4 top-[55%]"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {errors && errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            {/* Forgot password button */}
            <Button
              type="submit"
              className={"w-full cursor-pointer"}
              disabled={isSubmitting}
            >
              {isAuthLoading ? <Spinner /> : "Forgot password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPasswordPage;
