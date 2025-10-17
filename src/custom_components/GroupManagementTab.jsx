// importing components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";

const GroupManagementTab = ({ groupData }) => {
  return (
    <div className="max-h-full overflow-auto w-full bg-neutral-100 rounded-lg shadow-lg shadow-neutral-400/70 px-5 py-3">
      <Tabs defaultValue="members" className={"h-full"}>
        <div className="w-full overflow-x-auto scrollbar-none">
          <TabsList>
            <TabsTrigger
              value="members"
              className={
                "text-neutral-400 focus:text-neutral-800 cursor-pointer"
              }
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="join-requests"
              className={
                "text-neutral-400 focus:text-neutral-800 cursor-pointer"
              }
            >
              Join requests
            </TabsTrigger>
            <TabsTrigger
              value="reported-messages"
              className={
                "text-neutral-400 focus:text-neutral-800 cursor-pointer"
              }
            >
              Reported messages
            </TabsTrigger>
          </TabsList>
        </div>

        {/* table of the group members */}
        <TabsContent
          value="members"
          className={"h-full overflow-auto scrollbar-none"}
        >
          <Table className={"h-full overflow-auto scrollbar-none"}>
            <TableCaption>A list of group members</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Rollno</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"h-full overflow-y-auto"}>
              {groupData.members &&
                groupData.members.length > 0 &&
                groupData.members.map((member, index) => (
                  <TableRow key={member._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{member.rollno}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="relative">
                      <X
                        size={16}
                        className="absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* table of the join requests */}
        <TabsContent value="join-requests">
          <Table className={"h-full overflow-auto scrollbar-none"}>
            <TableCaption>A list of join requests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Rollno</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Accept/Reject</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"h-full overflow-y-auto"}>
              {groupData.requests &&
                groupData.requests.length > 0 &&
                groupData.requests.map((member, index) => (
                  <TableRow key={member._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{member.rollno}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="relative">
                      {/* Todo: Replace the icon with two buttons
                      one for accept the join request
                      other to reject the join request */}
                      <X
                        size={16}
                        className="absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="reported-messages"></TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagementTab;
