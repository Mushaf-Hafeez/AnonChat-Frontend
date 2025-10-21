import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getGroupData } from "@/services/group";

import LazyLoadingPage from "./LazyLoadingPage";

import GroupManagementHeader from "@/custom_components/GroupManagementHeader";
import GroupManagementTab from "@/custom_components/GroupManagementTab";
import { ArrowLeft, LucideChartGantt } from "lucide-react";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import { reportMessage } from "@/services/message";

const GroupManagementPage = () => {
  const [groupData, setGroupData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { selectedGroup } = useSelector((state) => state.Group);

  const navigate = useNavigate();
  const { groupId } = useParams();

  const getGroupDetails = async () => {
    setIsLoading(true);

    const response = await getGroupData(groupId);

    if (response.success) {
      setGroupData(response.groupData);
    }

    setIsLoading(false);
  };

  // handleLeftArrowClick function
  const handleLeftArrowClick = () => {
    navigate(-1);
  };

  // fetch the group data for this group in useEffect
  useEffect(() => {
    getGroupDetails();
  }, [groupId]);

  useEffect(() => {
    const handleReportedMessage = (message) => {
      console.log(message);

      setGroupData((prev) => ({
        ...prev,
        reportedMessages: [...prev.reportedMessages, message],
      }));
    };

    socket.on("report-message", handleReportedMessage);

    return () => {
      socket.off("report-message", handleReportedMessage);
    };
  }, [groupData?._id, socket, selectedGroup?._id]);

  if (isLoading) {
    return <LazyLoadingPage />;
  }

  return (
    <section className="h-screen w-full flex flex-col gap-4 bg-neutral-200 px-4 md:px-10 py-5">
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-100 py-3 px-5 rounded-lg shadow-lg shadow-neutral-400/70">
        <div className="flex items-center gap-2">
          {/* back button icon */}
          <ArrowLeft
            size={18}
            onClick={handleLeftArrowClick}
            className="cursor-pointer"
          />
          <div>
            <h2 className="text-lg md:text-2xl font-medium">
              {groupData.groupName}
            </h2>
            <p className="text-neutral-600 text-sm">
              {groupData.description?.endsWith(".")
                ? groupData.description
                : groupData.description + "."}
            </p>
          </div>
        </div>

        <GroupManagementHeader
          groupData={groupData}
          setGroupData={setGroupData}
        />
      </div>

      {/* Tab component */}
      <GroupManagementTab groupData={groupData} setGroupData={setGroupData} />
    </section>
  );
};

export default GroupManagementPage;
