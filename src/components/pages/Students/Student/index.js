import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Sidebar } from "components/molecules/SideBar";
import { Button } from "components/atoms/Botton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/molecules/Card";
import { ArrowLeft, Edit, UserX } from "lucide-react";
import { Badge } from "components/atoms/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "components/atoms/Avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/molecules/Table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "components/molecules/AlertDialog";
import { NotificationBell } from "components/molecules/NotificationBell";

// Mock data for student
const studentData = {
  STU001: {
    id: "STU001",
    name: "John Doe",
    department: "Computer Science",
    status: "Active",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    photo: "/placeholder.svg?height=200&width=200",
  },
  STU007: {
    id: "STU007",
    name: "Michael Brown",
    department: "Electrical Engineering",
    status: "Active",
    email: "michael.brown@example.com",
    phone: "555-234-5678",
    photo: "/placeholder.svg?height=200&width=200",
  },
  STU015: {
    id: "STU015",
    name: "Emma Wilson",
    department: "Business Administration",
    status: "Active",
    email: "emma.wilson@example.com",
    phone: "555-345-6789",
    photo: "/placeholder.svg?height=200&width=200",
  },
  STU031: {
    id: "STU031",
    name: "David Miller",
    department: "Physics",
    status: "Suspended",
    email: "david.miller@example.com",
    phone: "555-456-7890",
    photo: "/placeholder.svg?height=200&width=200",
  },
  STU045: {
    id: "STU045",
    name: "James Wilson",
    department: "Mathematics",
    status: "Suspended",
    email: "james.wilson@example.com",
    phone: "555-567-8901",
    photo: "/placeholder.svg?height=200&width=200",
  },
};

// Mock access logs for student
const studentAccessLogs = {
  STU001: [
    {
      date: "2023-05-15",
      time: "08:30 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-15",
      time: "04:30 PM",
      action: "Exit",
      location: "Main Gate",
    },
    {
      date: "2023-05-14",
      time: "08:45 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-14",
      time: "05:15 PM",
      action: "Exit",
      location: "Main Gate",
    },
    {
      date: "2023-05-13",
      time: "09:00 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-13",
      time: "03:30 PM",
      action: "Exit",
      location: "Main Gate",
    },
  ],
  STU007: [
    {
      date: "2023-05-15",
      time: "09:15 AM",
      action: "Entry",
      location: "East Gate",
    },
    {
      date: "2023-05-15",
      time: "05:45 PM",
      action: "Exit",
      location: "East Gate",
    },
    {
      date: "2023-05-14",
      time: "08:30 AM",
      action: "Entry",
      location: "East Gate",
    },
    {
      date: "2023-05-14",
      time: "04:30 PM",
      action: "Exit",
      location: "Main Gate",
    },
  ],
  STU015: [
    {
      date: "2023-05-15",
      time: "08:45 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-15",
      time: "06:15 PM",
      action: "Exit",
      location: "Main Gate",
    },
    {
      date: "2023-05-13",
      time: "08:30 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-13",
      time: "04:45 PM",
      action: "Exit",
      location: "Main Gate",
    },
  ],
  STU031: [
    {
      date: "2023-05-10",
      time: "08:15 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-10",
      time: "03:30 PM",
      action: "Exit",
      location: "Main Gate",
    },
    {
      date: "2023-05-09",
      time: "08:30 AM",
      action: "Entry",
      location: "Main Gate",
    },
    {
      date: "2023-05-09",
      time: "04:15 PM",
      action: "Exit",
      location: "Main Gate",
    },
  ],
  STU045: [
    {
      date: "2023-05-15",
      time: "02:30 PM",
      action: "Denied",
      location: "Main Gate",
      reason: "Student suspended",
    },
    {
      date: "2023-05-14",
      time: "09:15 AM",
      action: "Denied",
      location: "East Gate",
      reason: "Student suspended",
    },
    {
      date: "2023-05-12",
      time: "08:45 AM",
      action: "Denied",
      location: "Main Gate",
      reason: "Student suspended",
    },
  ],
};

function StudentDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const studentId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [student, setStudent] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }

    const userObj = JSON.parse(user);
    setUserRole(userObj.role);

    // Get student data
    const foundStudent = studentData[studentId];
    if (!foundStudent) {
      navigate("/students");
      return;
    }

    setStudent(foundStudent);

    // Get access logs
    const logs = studentAccessLogs[studentId] || [];
    setAccessLogs(logs);

    setIsLoading(false);
  }, [navigate, studentId]);

  const handleSuspendStudent = () => {
    setStudent((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Suspended" : "Active",
    }));
  };

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
          <div className="flex items-center">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link to="/students">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Student Details</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NotificationBell />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{student.id}</p>

              <Badge
                variant={
                  student.status === "Active" ? "outline" : "destructive"
                }
                className="mb-4"
              >
                {student.status}
              </Badge>

              {userRole === "admin" && (
                <div className="flex gap-2 w-full mt-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/students/edit/${student.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={
                          student.status === "Active"
                            ? "destructive"
                            : "outline"
                        }
                        className="flex-1"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        {student.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {student.status === "Active"
                            ? `Suspend ${student.name}?`
                            : `Activate ${student.name}?`}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {student.status === "Active"
                            ? "This will suspend the student's access to the campus. They will not be able to enter the premises."
                            : "This will restore the student's access to the campus."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleSuspendStudent}
                          className={
                            student.status === "Active" ? "bg-destructive" : ""
                          }
                        >
                          {student.status === "Active" ? "Suspend" : "Activate"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Department
                  </dt>
                  <dd className="text-base">{student.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Status
                  </dt>
                  <dd className="text-base">{student.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Email
                  </dt>
                  <dd className="text-base">{student.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="text-base">{student.phone}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Access History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Location</TableHead>
                  {student.status === "Suspended" && (
                    <TableHead>Reason</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.length > 0 ? (
                  accessLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.action === "Entry"
                              ? "default"
                              : log.action === "Exit"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.location}</TableCell>
                      {student.status === "Suspended" && (
                        <TableCell>{log.reason || "-"}</TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={student.status === "Suspended" ? 5 : 4}
                      className="text-center py-6"
                    >
                      No access logs found for this student
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

export default StudentDetailPage;
