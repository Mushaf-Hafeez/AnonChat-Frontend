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
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { addMember, rejectRequest, removeMember } from "@/services/group";
import {
  deleteReportedMessage,
  dismissReportedMessage,
} from "@/services/message";

const GroupManagementTab = ({ groupData, setGroupData }) => {
  // handleRemoveMember function
  const handleRemoveMember = async (member) => {
    const response = await removeMember(groupData._id, member._id);

    if (response.success) {
      // remove the user from the groupData.members
      const filteredMembers = groupData.members.filter(
        (joinedMember) => joinedMember._id !== member._id
      );

      setGroupData({ ...groupData, members: [...filteredMembers] });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // acceptRequest handler function
  const handleAcceptRequest = async (requestedMember) => {
    // Todo: remove the ID from the groupData.joinRequests and add the object into the groupData.members
    // Todo: make the api call to remove the ID from the group.joinRequests and add the member ID in the group.members
    const response = await addMember(groupData._id, requestedMember._id);

    if (response.success) {
      const members = [...groupData.members, requestedMember];
      const requests = groupData.requests.filter(
        (request) => request._id !== requestedMember._id
      );

      setGroupData({
        ...groupData,
        members,
        requests,
      });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // rejectRequest handler function
  const handleRejectRequest = async (requestedMember) => {
    // Todo: remove the ID from the groupData.joinRequests
    // Todo: make the api call to remove the ID from the group.joinRequests
    const response = await rejectRequest(groupData._id, requestedMember._id);

    if (response.success) {
      const requests = groupData.requests.filter(
        (request) => request._id !== requestedMember._id
      );

      setGroupData({
        ...groupData,
        requests,
      });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // deleteReported Message handler function
  const handleDeleteReportedMessage = async (reportedMessage) => {
    // Todo: make the api call and remove it from the groupData
    const response = await deleteReportedMessage(
      groupData._id,
      reportedMessage._id
    );

    if (response.success) {
      const reportedMessages = groupData.reportedMessages.filter(
        (message) => message._id !== reportedMessage._id
      );

      setGroupData({
        ...groupData,
        reportedMessages,
      });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // dismissReported Message handler function
  const handleDismissReportedMessage = async (reportedMessage) => {
    // Todo: make the api call and remove it from the groupData

    const response = await dismissReportedMessage(
      groupData._id,
      reportedMessage._id
    );

    if (response.success) {
      const reportedMessages = groupData.reportedMessages.filter(
        (message) => message._id !== reportedMessage._id
      );

      setGroupData({
        ...groupData,
        reportedMessages,
      });

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

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

        {/* table for the group members */}
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
                        onClick={() => handleRemoveMember(member)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* table for the join requests */}
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
                      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-2">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className={"cursor-pointer"}
                          onClick={() => handleAcceptRequest(member)}
                        >
                          <Check />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className={"cursor-pointer"}
                          onClick={() => handleRejectRequest(member)}
                        >
                          <X />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Table for the reportedMessages */}
        <TabsContent value="reported-messages">
          <Table className={"h-full overflow-auto scrollbar-none"}>
            <TableCaption>A list of reported messages</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Sender rollno</TableHead>
                <TableHead>Sender name</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Delete/Dismiss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"h-full overflow-y-auto"}>
              {groupData.reportedMessages &&
                groupData.reportedMessages.length > 0 &&
                groupData.reportedMessages.map((message, index) => (
                  <TableRow key={message._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{message.sender.rollno}</TableCell>
                    <TableCell>{message.sender.name}</TableCell>
                    <TableCell>{message.content}</TableCell>
                    <TableCell className="relative">
                      {/* Todo: Replace the icon with two buttons
                      one for accept the join request
                      other to reject the join request */}
                      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-2">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className={"cursor-pointer"}
                          onClick={() => handleDeleteReportedMessage(message)}
                        >
                          <Check />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className={"cursor-pointer"}
                          onClick={() => handleDismissReportedMessage(message)}
                        >
                          <X />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagementTab;
