import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Sidebar } from "components/molecules/SideBar";
import { Button } from "components/atoms/Botton";
import { Input } from "components/atoms/Input";
import { Label } from "components/atoms/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/atoms/Select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/molecules/Card";
import { ArrowLeft, Upload } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "components/molecules/Tab";
import { NotificationBell } from "components/molecules/NotificationBell";
import { Badge } from "components/atoms/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "components/molecules/Table";

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

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
  "Psychology",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "History",
  "English Literature",
  "Political Science",
  "Sociology",
];

function EditStudentPage() {
  const navigate = useNavigate();
  const params = useParams();
  const studentId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [student, setStudent] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }

    const userObj = JSON.parse(user);
    if (userObj.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    setUserRole(userObj.role);

    // Get student data
    const foundStudent = studentData[studentId];
    if (!foundStudent) {
      navigate("/students");
      return;
    }

    setStudent(foundStudent);
    setPhotoPreview(foundStudent.photo);

    // Get access logs
    const logs = studentAccessLogs[studentId] || [];
    setAccessLogs(logs);

    setIsLoading(false);
  }, [navigate, studentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setStudent((prev) => ({ ...prev, department: value }));
  };

  const handleStatusChange = (value) => {
    setStudent((prev) => ({ ...prev, status: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    console.log("Updating student data:", student);

    // Navigate back to student list
    navigate("/students");
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
            <h1 className="text-3xl font-bold">Edit Student</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NotificationBell />
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Student Details</TabsTrigger>
            <TabsTrigger value="access">Access History</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="space-y-4">
                        <div className="flex flex-col items-center">
                          <div className="relative h-48 w-48 mb-4">
                            <img
                              src={photoPreview || "/placeholder.svg"}
                              alt="Student"
                              className="h-full w-full rounded-md object-cover border"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                              <label
                                htmlFor="photo"
                                className="flex flex-col items-center justify-center cursor-pointer text-white"
                              >
                                <Upload className="h-6 w-6 mb-2" />
                                <span>Change Photo</span>
                              </label>
                              <input
                                id="photo"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoChange}
                              />
                            </div>
                          </div>

                          <div className="w-full">
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={student.status}
                              onValueChange={handleStatusChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Suspended">
                                  Suspended
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="id">Student ID</Label>
                          <Input
                            id="id"
                            name="id"
                            value={student.id}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={student.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={student.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={student.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={student.department}
                          onValueChange={handleSelectChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem key={department} value={department}>
                                {department}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" type="button" asChild>
                          <Link to="/students">Cancel</Link>
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EditStudentPage;
