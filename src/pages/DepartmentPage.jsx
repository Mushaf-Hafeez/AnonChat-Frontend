import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// importing components
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { Trash2 } from "lucide-react";

import { useForm } from "react-hook-form";

// importing api call functions
import {
  addDepartment,
  deleteDepartment,
  getDepartments,
} from "@/services/department";

import { toast } from "react-toastify";
import Spinner from "@/custom_components/Spinner";
import { setDepartments as setDepartmentsRedux } from "@/redux/slices/dataSlice";

const DepartmentPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // onSubmit function
  const onSubmit = async (data) => {
    const departmentData = { name: data.name, code: data.code.toUpperCase() };

    setIsLoading(true);

    const response = await addDepartment(departmentData);

    if (response.success) {
      console.log("add department response is: ", response);
      const updatedDepartments = [...departments, response.department];
      setDepartments(updatedDepartments);
      dispatch(setDepartmentsRedux(updatedDepartments));
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    const response = await deleteDepartment(id);

    if (response.success) {
      const updatedDepartments = departments.filter((dept) => dept._id !== id);
      setDepartments(updatedDepartments);
      dispatch(setDepartmentsRedux(updatedDepartments));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // fetch departments
  const fetchDepartments = useCallback(async () => {
    const response = await getDepartments();

    if (response.success) {
      setDepartments(response.departments);
      dispatch(setDepartmentsRedux(response.departments));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <section>
      <div className="overflow-y-auto col-center lg:items-start gap-2">
        <h2 className="text-lg font-medium">Add Department</h2>

        {/* add department form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          {/* Department name label and input */}
          <div className="space-y-4">
            <Label htmlFor="name">Department name</Label>
            <Input
              id={"name"}
              type={"text"}
              className={`${
                errors &&
                errors.name &&
                "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
              }`}
              placeholder="Enter department name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Department name is required.",
                },
              })}
            ></Input>
            {errors && errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Department code label and input */}
          <div className="space-y-4">
            <Label htmlFor="code">Department code</Label>
            <Input
              id={"code"}
              type={"text"}
              className={`${
                errors &&
                errors.code &&
                "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
              }`}
              placeholder="Enter department code"
              {...register("code", {
                required: {
                  value: true,
                  message: "Department code is required.",
                },
              })}
            ></Input>
            {errors && errors.code && (
              <p className="text-red-500 text-xs">{errors.code.message}</p>
            )}

            {/* Add button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={"w-full cursor-pointer"}
            >
              {isLoading && <Spinner className={"fill-white"} />}
              {!isLoading && "Add"}
            </Button>
          </div>
        </form>

        {/* all departments */}
        <h2 className="text-lg font-medium">Departments</h2>
        <Table className={"h-full overflow-y-auto"}>
          <TableCaption>List of departments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length > 0 ? (
              departments.map((department, index) => (
                <TableRow key={department._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{department.code}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell className="relative h-full">
                    <Trash2
                      size={18}
                      onClick={() => handleDelete(department._id)}
                      className="absolute right-6 top-0 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="w-full whitespace-nowrap flex-center">
                <TableCell colSpan={4} className="text-center">
                  No department found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default DepartmentPage;
