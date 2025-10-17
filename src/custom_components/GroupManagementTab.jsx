// importing components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GroupManagementTab = () => {
  return (
    <div className="h-full w-full bg-neutral-100 rounded-lg shadow-lg shadow-neutral-400/70 px-5 py-3">
      <Tabs defaultValue="account">
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
        <TabsContent value="members">
          Here you will show the table of the group members with CTA buttons.
        </TabsContent>
        <TabsContent value="join-requests">
          Here you will show the join requests.
        </TabsContent>
        <TabsContent value="reported-messages">
          Here you will show the reported messages.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagementTab;
