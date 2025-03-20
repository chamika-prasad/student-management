import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "components/molecules/SideBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/molecules/Table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/molecules/Card";
import { Badge } from "components/atoms/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "components/atoms/Avatar";
import { Input } from "components/atoms/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/atoms/Select";
import { Label } from "components/atoms/Label";
import { NotificationBell } from "components/molecules/NotificationBell";
import { DevPanel } from "components/molecules/DevPanel";

// Updated mock data to include ID mismatch events and regular access logs
const accessLogsData = [
  // Regular access logs
  {
    id: "STU001",
    name: "John Doe",
    time: "08:30 AM",
    date: "2023-05-15",
    status: "Entry",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Regular access",
    location: "Main Gate",
  },
  {
    id: "STU007",
    name: "Michael Brown",
    time: "09:15 AM",
    date: "2023-05-15",
    status: "Entry",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Regular access",
    location: "East Gate",
  },
  {
    id: "STU015",
    name: "Emma Wilson",
    time: "08:45 AM",
    date: "2023-05-15",
    status: "Entry",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Regular access",
    location: "Main Gate",
  },
  {
    id: "STU001",
    name: "John Doe",
    time: "04:30 PM",
    date: "2023-05-15",
    status: "Exit",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Regular exit",
    location: "Main Gate",
  },
  // Unauthorized access logs
  {
    id: "STU099",
    name: "Unknown Person",
    time: "10:15 AM",
    date: "2023-05-15",
    status: "Denied",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Unrecognized face",
    location: "Main Gate",
  },
  {
    id: "STU045",
    name: "James Wilson",
    time: "02:30 PM",
    date: "2023-05-15",
    status: "Suspended",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Student suspended",
    location: "East Gate",
  },
  {
    id: "STU015/STU007",
    name: "ID Mismatch",
    time: "01:20 PM",
    date: "2023-05-15",
    status: "ID Mismatch",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Face recognized as Michael Brown but used Emma Wilson's ID",
    location: "Main Gate",
  },
  {
    id: "STU034",
    name: "Lisa Johnson",
    time: "11:45 AM",
    date: "2023-05-14",
    status: "Expired ID",
    image: "/placeholder.svg?height=40&width=40",
    reason: "ID card expired",
    location: "West Gate",
  },
  {
    id: "STU078",
    name: "Mark Thompson",
    time: "09:10 AM",
    date: "2023-05-14",
    status: "Denied",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Wrong entrance",
    location: "Faculty Gate",
  },
  {
    id: "STU112/STU061",
    name: "ID Mismatch",
    time: "08:30 AM",
    date: "2023-05-14",
    status: "ID Mismatch",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Face recognized as Robert Taylor but used Amanda Perez's ID",
    location: "Main Gate",
  },
  {
    id: "STU112",
    name: "Amanda Perez",
    time: "04:22 PM",
    date: "2023-05-13",
    status: "Denied",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Outside access hours",
    location: "Main Gate",
  },
  {
    id: "STU067",
    name: "Kevin Lee",
    time: "01:15 PM",
    date: "2023-05-13",
    status: "Suspended",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Student suspended",
    location: "East Gate",
  },
  {
    id: "UNKNOWN",
    name: "Unknown Person",
    time: "08:30 PM",
    date: "2023-05-12",
    status: "Denied",
    image: "/placeholder.svg?height=40&width=40",
    reason: "After hours access attempt",
    location: "Main Gate",
  },
  {
    id: "STU091",
    name: "Rachel Green",
    time: "10:45 AM",
    date: "2023-05-12",
    status: "Expired ID",
    image: "/placeholder.svg?height=40&width=40",
    reason: "ID card expired",
    location: "East Gate",
  },
];

function AccessLogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }

    setUserRole(JSON.parse(user).role);
    setIsLoading(false);
  }, [navigate]);

  const filteredLogs = accessLogsData.filter((log) => {
    const matchesSearch =
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 pt-16 md:pt-8 md:ml-64">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Access Logs</h1>
          <div className="flex items-center gap-2">
            <DevPanel />
            <div className="hidden md:block">
              <NotificationBell />
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Access Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end mb-6">
              <div className="w-full md:w-1/2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by ID, name, reason, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label htmlFor="status">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="Entry">Entry</SelectItem>
                    <SelectItem value="Exit">Exit</SelectItem>
                    <SelectItem value="Denied">Denied</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Expired ID">Expired ID</SelectItem>
                    <SelectItem value="ID Mismatch">ID Mismatch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>ID/Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date/Time
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={log.image} alt={log.name} />
                          <AvatarFallback>{log.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{log.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{new Date(log.date).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.time}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {log.location}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getBadgeVariant(log.status)}
                          className={
                            log.status === "ID Mismatch"
                              ? "bg-orange-600 hover:bg-orange-700"
                              : ""
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No logs found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to determine badge variant based on status
function getBadgeVariant(status) {
  switch (status) {
    case "Entry":
      return "default";
    case "Exit":
      return "secondary";
    case "Denied":
    case "Suspended":
    case "Expired ID":
      return "destructive";
    case "ID Mismatch":
      return "destructive"; // We'll override this with custom color in the className
    default:
      return "outline";
  }
}

export default AccessLogsPage;
