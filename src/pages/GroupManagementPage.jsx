import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getGroupData } from "@/services/group";

import LazyLoadingPage from "./LazyLoadingPage";

import GroupManagementHeader from "@/custom_components/GroupManagementHeader";
import GroupManagementGrids from "@/custom_components/GroupManagementTab";
import { getMessages } from "@/services/message";
import GroupManagementTab from "@/custom_components/GroupManagementTab";

const GroupManagementPage = () => {
  const [groupData, setGroupData] = useState({});
  const [noOfMessages, setNoOfMessages] = useState();
  const [selectedCard, setSelectedCard] = useState(1);
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

  // getNoOfMessages function
  const getNoOfMessages = async () => {
    const response = await getMessages(groupId);

    if (response.success) {
      setNoOfMessages(response.messages.length);
    }

    console.log(response);
  };
  // fetch the group data for this group in useEffect
  useEffect(() => {
    getGroupDetails();
    getNoOfMessages();
  }, [groupId]);

  if (isLoading) {
    return <LazyLoadingPage />;
  }

  return (
    <section className="h-screen w-full flex flex-col gap-4 bg-neutral-200 px-4 md:px-10 py-5">
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-100 py-3 px-5 rounded-lg shadow-lg shadow-neutral-400/70">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-2xl font-medium">
            {groupData.groupName}
          </h2>
          <p className="text-neutral-600 text-sm">
            {groupData.description.endsWith(".")
              ? groupData.description
              : groupData.description + "."}
          </p>
        </div>

        <GroupManagementHeader groupData={groupData} />
      </div>

      {/* Tab component */}
      <GroupManagementTab
        groupData={groupData}
        noOfMessages={noOfMessages}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />

      {/* here you will show the table for the selected card */}

      {/* Todo: remove the card click  */}
      {/* Todo: add the dropdown to selected the table */}

      {/* if selectedCard === 1 then show the table for the members of the group and the CTA to remove them */}
      {/* if selectedCard === 1 then show the table for the members of the group and the CTA to remove them */}
    </section>
  );
};

export default GroupManagementPage;
