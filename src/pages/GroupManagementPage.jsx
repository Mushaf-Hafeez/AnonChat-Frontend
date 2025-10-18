import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getGroupData } from "@/services/group";

import LazyLoadingPage from "./LazyLoadingPage";

import GroupManagementHeader from "@/custom_components/GroupManagementHeader";
import GroupManagementGrids from "@/custom_components/GroupManagementTab";
import GroupManagementTab from "@/custom_components/GroupManagementTab";
import { ArrowLeft } from "lucide-react";

const GroupManagementPage = () => {
  const [groupData, setGroupData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { groupId } = useParams();

  const getGroupDetails = async () => {
    setIsLoading(true);

    const response = await getGroupData(groupId);

    console.log(response);

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

        <GroupManagementHeader groupData={groupData} />
      </div>

      {/* Tab component */}
      <GroupManagementTab groupData={groupData} />
    </section>
  );
};

export default GroupManagementPage;
