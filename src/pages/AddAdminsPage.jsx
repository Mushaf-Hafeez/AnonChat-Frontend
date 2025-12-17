import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// importing components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// importing custom component
import Spinner from "@/custom_components/Spinner";

// importin constant data
import { roles } from "@/constants/data";

// importing api call functions
import { addAdmin, getAdmins, deleteAdmin } from "@/services/admin";

import { toast } from "react-toastify";
import { Search, Trash2 } from "lucide-react";

const AddAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [searchedAdmins, setSearchedAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: {
      rollno: "",
      role: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    // call add admin api
    const response = await addAdmin(data);

    if (response.success) {
      setAdmins([...admins, response.admin]);
      toast.success(response.message);
      reset({ rollno: "", role: "" });
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  // handleDelete function
  const handleDelete = async (id) => {
    const response = await deleteAdmin(id);

    if (response.success) {
      const filteredAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(filteredAdmins);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // fetch admins function
  const fetchAdmins = async () => {
    const response = await getAdmins();

    if (response.success) {
      setAdmins(response.admins);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const searchValue = watch("searchedRollno") || "";

    const filteredAdmins = searchValue
      ? admins.filter((admin) =>
          admin.rollno.toLowerCase().includes(searchValue.toLowerCase())
        )
      : admins;

    setSearchedAdmins(filteredAdmins);
  }, [watch("searchedRollno"), admins]);

  // Todo: uncomment the pattern for the rollno

  return (
    <section>
      <div className="overflow-y-auto col-center lg:items-start gap-2">
        <h2 className="text-lg font-medium">Add Admins</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
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

          {/* role input and dropdown */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required." }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      {roles &&
                        roles.length > 0 &&
                        roles.map((role, index) => (
                          <SelectItem key={index} value={role.value}>
                            {role.title}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Add Button */}
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

      {/* here will be all the admins */}
      <div className="col-center lg:items-start gap-4">
        <div className="w-full flex-center justify-between">
          <h2 className="text-lg font-medium">Admins</h2>
          <div className="relative">
            <Input
              type={"text"}
              placeholder="Search rollno"
              className={"w-fit float-end"}
              {...register("searchedRollno")}
            ></Input>
            <Search
              size={"20"}
              className="absolute top-2 right-3 text-neutral-500"
            />
          </div>
        </div>
        <Table className={"h-full overflow-y-auto"}>
          <TableCaption>List of Admins</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Rollno</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedAdmins && searchedAdmins.length > 0 ? (
              searchedAdmins.map((admin, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{admin._id}</TableCell>
                  <TableCell>{admin.rollno}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell className="relative h-full">
                    <Trash2
                      size={18}
                      onClick={() => handleDelete(admin._id)}
                      className="absolute right-6 top-0 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full whitespace-nowrap flex-center">
                  No admin found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AddAdminsPage;
