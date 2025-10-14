import Spinner from "@/custom_components/Spinner";
import { getGroupData } from "@/services/group";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LazyLoadingPage from "./LazyLoadingPage";

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
    <section className="h-screen w-full bg-neutral-200">
      <h1>{groupData.groupName}</h1>
    </section>
  );
};

export default GroupManagementPage;
