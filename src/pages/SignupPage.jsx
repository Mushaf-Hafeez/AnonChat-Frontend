import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// importing reducers
import { setIsAuthLoading } from "@/redux/slices/authSlice";
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
import { login } from "@/services/auth";
import { getDepartments } from "@/services/department";

// importing constant data
import { semesters } from "@/constants/data";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);

  const { isAuthLoading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
  } = useForm();

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Todo: add functionality
  const handleForgotPassword = () => {};

  // Todo: destructure more data from data object
  const onSubmit = async (data) => {
    console.log("Data is: ", data);
  };

  // function to get the departments
  const fetchDepartments = async () => {
    const response = await getDepartments();

    if (response.success) {
      setDepartments(response.departments);
    }
  };

  // Todo: create a function that will fetch the sections also when the department or semester is changed

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Todo: uncomment the email and password patterns

  // Todo: Fields required (name , roll no, email , password, confirmPassword, section, semester)

  return (
    <section className="min-h-screen w-full col-center">
      <Card
        className={
          "w-11/12 md:w-4/12 mx-auto shadow-xl border-2 border-neutral-200"
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

            {/* Todo: make department a dropdown */}

            {/* department label and input */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required." }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Departments</SelectLabel>
                        {departments &&
                          departments.length > 0 &&
                          departments.map((dept, index) => (
                            <SelectItem key={index} value={dept.code}>
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
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Controller
                name="semester"
                control={control}
                rules={{ required: "Semester is required." }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your semester" />
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
              Forgot Password?
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignupPage;
