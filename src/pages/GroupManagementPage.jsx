import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getGroupData } from "@/services/group";

import LazyLoadingPage from "./LazyLoadingPage";

import GroupManagementHeader from "@/custom_components/GroupManagementHeader";

const GroupManagementPage = () => {
  const [groupData, setGroupData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { groupId } = useParams();

  const getGroupDetails = async () => {
    setIsLoading(true);

    const response = await getGroupData(groupId);

    if (response.success) {
      setGroupData(response.groupData);
    }

    setIsLoading(false);
  };

  // fetch the group data for this group in useEffect
  useEffect(() => {
    getGroupDetails();
  }, [groupId]);

  if (isLoading) {
    return <LazyLoadingPage />;
  }

  return (
    <section className="h-screen w-full bg-neutral-200 px-4 md:px-10 py-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-medium">Group Management</h2>

        <GroupManagementHeader groupData={groupData} />
      </div>
    </section>
  );
};

export default GroupManagementPage;
