import React, { useState } from "react";
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
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

// importing custom components
import Spinner from "@/custom_components/Spinner";

// importing constant data
import { semesters, sessions } from "@/constants/data";

import { deleteSection, getSections } from "@/services/section";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const DeleteSection = ({ departments }) => {
  const [searchedSection, setSearchedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      department: "",
      semester: "",
      session: "",
    },
  });

  //   handleDelete function
  const handleDelete = async (sec) => {
    const dataToBeDeleted = {
      department: searchedSection.department,
      semester: searchedSection.semester,
      session: searchedSection.session,
      section: sec,
    };

    const response = await deleteSection(dataToBeDeleted);

    const updatedSections = searchedSection.sections.filter(
      (section) => section !== sec
    );

    setSearchedSection({ ...searchedSection, sections: updatedSections });

    if (response.success) {
      toast.success(response.message);
    }
  };

  //   onSubmit function
  const onSubmit = async (data) => {
    setIsLoading(true);

    // get the section
    const response = await getSections(data);

    if (response.success) {
      setSearchedSection(response.sections[0]);
      reset({
        department: "",
        semester: "",
        session: "",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-lg font-medium">Sections</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4"
      >
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
            <p className="text-red-500 text-xs">{errors.department.message}</p>
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
            <p className="text-red-500 text-xs">{errors.semester.message}</p>
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
            <p className="text-red-500 text-xs">{errors.session.message}</p>
          )}
        </div>

        {/* Add button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={"cursor-pointer"}
        >
          {isLoading && <Spinner className={"fill-white"} />}
          {!isLoading && "Search"}
        </Button>
      </form>

      {/* here the sections will be displayed */}
      <div>
        <Table className={"h-full overflow-y-auto"}>
          <TableCaption>List of Sections.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Section</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedSection?.sections &&
            searchedSection.sections.length > 0 ? (
              searchedSection.sections.map((sec, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{searchedSection.department}</TableCell>
                  <TableCell>{searchedSection.semester}</TableCell>
                  <TableCell>{searchedSection.session}</TableCell>
                  <TableCell>{sec}</TableCell>
                  <TableCell className="relative h-full">
                    <Trash2
                      size={18}
                      onClick={() => handleDelete(sec)}
                      className="absolute right-6 top-0 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full whitespace-nowrap flex-center">
                  No department found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeleteSection;
