import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// importing reducers
import { setIsAuthLoading, setSignupData } from "@/redux/slices/authSlice";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// importing custom components
import Spinner from "@/custom_components/Spinner";

// importing api call functions
import { getSections } from "@/services/section";
import { sendOTP } from "@/services/auth";

// importing constant data
import { semesters, sessions } from "@/constants/data";
import { setDepartments } from "@/redux/slices/dataSlice";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [sections, setSections] = useState([]);

  const { isAuthLoading } = useSelector((state) => state.Auth);
  const { departments } = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
  } = useForm();

  const navigate = useNavigate();

  // selected data to get the sections
  const selectedDepartment = watch("department");
  const selectedSemester = watch("semester");
  const selectedSession = watch("session");

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Todo: add functionality
  const handleForgotPassword = () => {};

  // function to fetch the sections
  const fetchSections = useCallback(async () => {
    // if department, semester and session is selected then only fetch the data
    if (selectedDepartment && selectedSemester && selectedSession) {
      const getSectionsData = {
        department: selectedDepartment,
        semester: selectedSemester,
        session: selectedSession,
      };

      const response = await getSections(getSectionsData);

      if (response.success) {
        setSections(response.sections[0].sections);
      }
    } else {
      return;
    }
  }, [selectedDepartment, selectedSemester, selectedSession]);

  const onSubmit = async (data) => {
    // destructure the data
    const {
      name,
      rollno,
      email,
      password,
      confirmPassword,
      section,
      semester,
      department,
    } = data;

    // create the signup data
    const signupData = {
      name,
      rollno,
      email,
      password,
      confirmPassword,
      section,
      semester,
      department,
    };

    // return if both passwords are not same
    if (password !== confirmPassword) {
      toast.error("Passwords must be same");
      return;
    }

    // set the data in auth
    dispatch(setSignupData(signupData));

    dispatch(setIsAuthLoading(true));

    // send request to the send-otp api
    const response = await sendOTP(email);

    if (response.success) {
      navigate("/verify-otp");
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
    dispatch(setIsAuthLoading(false));
  };

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // Todo: uncomment the email and password patterns

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
      className="min-h-screen w-full col-center"
    >
      <Card
        className={
          "w-11/12 my-20 sm:w-8/12 lg:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
        }
      >
        <CardHeader className={"flex-center gap-4"}>
          <CardTitle className={"text-center text-4xl font-semibold"}>
            Signup
          </CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name label and input */}
            <div className="space-y-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id={"name"}
                type={"text"}
                className={`${
                  errors &&
                  errors.name &&
                  "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                }`}
                placeholder="Enter your name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required.",
                  },
                })}
              ></Input>
              {errors && errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Rollno label and input */}
            <div className="space-y-4 relative">
              <Label htmlFor="rollno">Roll no</Label>
              <Input
                id={"rollno"}
                type={"text"}
                className={`${
                  errors &&
                  errors.rollno &&
                  "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                }`}
                placeholder="Enter your roll no"
                {...register("rollno", {
                  required: { value: true, message: "Roll no is required." },
                  minLength: {
                    value: 12,
                    message: "Invalid roll no",
                  },
                  pattern: {
                    value: /^[sf]\d{2}[a-z]+\d[me]\d{5}$/i,
                    message: "Invalid roll no.",
                  },
                })}
              ></Input>
            </div>
            {errors && errors.rollno && (
              <p className="text-red-500">{errors.rollno.message}</p>
            )}

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
            {errors && errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            {/* department label and input */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required." }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Departments</SelectLabel>
                        {departments &&
                          departments.length > 0 &&
                          departments.map((dept, index) => (
                            <SelectItem key={index} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && (
                <p className="text-red-500">{errors.department.message}</p>
              )}
            </div>

            {/* Semester label and dropdown */}
            <div className="container flex flex-wrap space-x-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Controller
                  name="semester"
                  control={control}
                  rules={{ required: "Semester is required." }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Semesters</SelectLabel>
                          {semesters &&
                            semesters.length > 0 &&
                            semesters.map((semester, index) => (
                              <SelectItem value={semester.value} key={index}>
                                {semester.value}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.semester && (
                  <p className="text-red-500">{errors.semester.message}</p>
                )}
              </div>

              {/* session label and dropdown */}
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Controller
                  name="session"
                  control={control}
                  rules={{ required: "Session is required." }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sessions</SelectLabel>
                          {sessions &&
                            sessions.length > 0 &&
                            sessions.map((session, index) => (
                              <SelectItem value={session.value} key={index}>
                                {session.value}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.session && (
                  <p className="text-red-500">{errors.session.message}</p>
                )}
              </div>

              {/* section label and dropdown */}
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Controller
                  name="section"
                  control={control}
                  rules={{ required: "Sectoin is required." }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sessions</SelectLabel>
                          {sections &&
                            sections.length > 0 &&
                            sections.map((section, index) => (
                              <SelectItem value={section} key={index}>
                                {section}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.section && (
                  <p className="text-red-500">{errors.section.message}</p>
                )}
              </div>
            </div>

            {/* Signup button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={"w-full cursor-pointer"}
            >
              {isAuthLoading && <Spinner className={"fill-white"} />}
              {!isAuthLoading && "Signup"}
            </Button>
            <Button
              variant={"ghost"}
              onClick={handleForgotPassword}
              className={"cursor-pointer"}
            >
              <Link to="/login">Already have an account?</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default SignupPage;
