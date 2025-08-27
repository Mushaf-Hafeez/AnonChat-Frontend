import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { semesters, sessions } from "@/constants/data";
import { addSection } from "@/services/section";
import { toast } from "react-toastify";

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
import DeleteSection from "@/components/ui/DeleteSection";

const SectionPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm();

  const { departments } = useSelector((state) => state.Data);

  //   onSubmit function
  const onSubmit = async (data) => {
    setIsLoading(true);

    // call the addSection api
    const response = await addSection(data);

    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <div className="overflow-y-auto col-center lg:items-start gap-2">
        {/* This is add section */}

        <h2 className="text-lg font-medium">Add Section</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
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
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Controller
              name="semester"
              control={control}
              rules={{ required: "Semester is required." }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
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
                  <SelectTrigger className="w-[180px]">
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

          {/* Section label and input */}
          <div className="space-y-4">
            <Label htmlFor="section">Section</Label>
            <Input
              id={"section"}
              type={"text"}
              placeholder="Enter section"
              {...register("section", {
                required: {
                  value: true,
                  message: "Section is required.",
                },
              })}
            ></Input>
            {errors && errors.section && (
              <p className="text-red-500">{errors.section.message}</p>
            )}
          </div>

          {/* Add button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={"w-full cursor-pointer"}
          >
            {isLoading && <Spinner className={"fill-white"} />}
            {!isLoading && "Add"}
          </Button>
        </form>
      </div>

      {/* add the section to get the sections of the department, semester and session */}
      <DeleteSection departments={departments} />
    </section>
  );
};

export default SectionPage;
