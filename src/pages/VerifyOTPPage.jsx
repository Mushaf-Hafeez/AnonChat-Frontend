// importing shadcn ui components
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// importing custom components
import Spinner from "@/custom_components/Spinner";

// importing icon
import { RotateCcw } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sendOTP, signup } from "@/services/auth";
import { toast } from "react-toastify";
import {
  setIsAuth,
  setIsAuthLoading,
  setOTPToSignupData,
} from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/slices/userSlice";

const VerifyOTPPage = () => {
  const { signupData, isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [otp, setOTP] = useState("");
  const [timeLeft, setTimeLeft] = useState();
  const [isTimerActive, setIsTimerActive] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // handleResendOTP function
  const handleResendOTP = async () => {
    const response = await sendOTP(signupData.email);

    if (response.success) {
      toast.success(response.message);
      setTimeLeft(5 * 60);
      setIsTimerActive(true);
    }
  };

  //   handleSubmit function
  const handleSubmit = async () => {
    // show error if otp is not entered or less then 6
    if (!otp || otp.length < 6) {
      toast.error("Please enter valid OTP");
    }

    // add the otp in the signupData in the state
    dispatch(setOTPToSignupData(otp));

    dispatch(setIsAuthLoading(true));

    const newSignupData = structuredClone(signupData);
    newSignupData.otp = otp;

    // call the signup api
    const response = await signup(newSignupData);

    // Todo: fix why the internal server error came

    if (response.success) {
      setOTP("");
      setIsTimerActive(false);
      setTimeLeft(5 * 60);
      // console.log("signup response is: ", response);
      dispatch(setIsAuth(response.success));
      dispatch(setUser(response.user));
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }

    dispatch(setIsAuthLoading(false));
  };

  useEffect(() => {
    if (signupData && signupData.email) {
      setTimeLeft(5 * 60);
      setIsTimerActive(true);
    }
  }, []);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      dispatch(setIsAuthLoading(false));
    }
  }, [timeLeft, isTimerActive]);

  return (
    <section className="h-screen w-full flex-center">
      <Card
        className={
          "w-11/12 md:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
        }
      >
        <CardHeader className={"text-center"}>
          <CardTitle className={"text-4xl font-semibold text-nowrap"}>
            OTP Verification
          </CardTitle>
          <CardDescription>
            OTP (one-time password) sent to{" "}
            {`${signupData && signupData.email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={6} value={otp} onChange={setOTP}>
            <InputOTPGroup className={"mx-auto"}>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={handleSubmit}
            className={"w-full mt-4 cursor-pointer"}
          >
            {isAuthLoading && <Spinner className={"fill-white"} />}
            {!isAuthLoading && "Verify"}
          </Button>
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          {isTimerActive ? (
            <div className="text-xl font-semibold">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          ) : (
            <Button
              onClick={handleResendOTP}
              variant={"ghost"}
              className={"cursor-pointer"}
            >
              Resend <RotateCcw />
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default VerifyOTPPage;
