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

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { setIsAuthLoading } from "@/redux/slices/authSlice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// importing api call functions
import { forgotPassword } from "../services/auth";

const ForgotPasswordPage = () => {
  const { isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  //   onSubmit function
  const onSubmit = async (data) => {
    // set isAuthLoading to true
    dispatch(setIsAuthLoading(true));

    // call the forgotPassword api
    const response = await forgotPassword(data.email);

    // if request is successful then show the success toast else show the error toast and redirect user to the resetPasswordPage

    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }

    // set isAuthLoading to false
    dispatch(setIsAuthLoading(false));
  };

  //   Todo: uncomment the email pattern

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="h-screen w-full col-center"
    >
      <Card
        className={
          "w-11/12 md:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
        }
      >
        <CardHeader className={"flex-center text-center gap-4"}>
          <CardTitle className={"text-4xl font-semibold"}>
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email and we will send you the link to reset your
            password.
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
    </motion.section>
  );
};

export default ForgotPasswordPage;
