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

const GroupManagementTab = ({ groupData }) => {
  return (
    <div className="h-full w-full bg-neutral-100 rounded-lg shadow-lg shadow-neutral-400/70 px-5 py-3">
      <Tabs defaultValue="members">
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
        <TabsContent value="members">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
