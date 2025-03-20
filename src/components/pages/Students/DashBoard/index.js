import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from "components/molecules/SideBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/molecules/Table";
import { Button } from "components/atoms/Botton";
import { Badge } from "components/atoms/Badge";
import { Card, CardContent } from "components/molecules/Card";
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
import { Edit, Eye, Plus, UserX } from "lucide-react";
import { Input } from "components/atoms/Input";
import { NotificationBell } from "components/molecules/NotificationBell";
import { DevPanel } from "components/molecules/DevPanel";

// Mock data
const studentList = [
  { id: "STU001", name: "John Doe", department: "Computer Science", status: "Active" },
  { id: "STU007", name: "Michael Brown", department: "Electrical Engineering", status: "Active" },
  { id: "STU015", name: "Emma Wilson", department: "Business Administration", status: "Active" },
  { id: "STU023", name: "Sarah Parker", department: "Psychology", status: "Active" },
  { id: "STU031", name: "David Miller", department: "Physics", status: "Suspended" },
  { id: "STU042", name: "Alexandra Johnson", department: "Chemistry", status: "Active" },
  { id: "STU045", name: "James Wilson", department: "Mathematics", status: "Suspended" },
  { id: "STU052", name: "Olivia Davis", department: "Biology", status: "Active" },
  { id: "STU061", name: "Robert Taylor", department: "Economics", status: "Active" },
  { id: "STU073", name: "Sophia Martinez", department: "History", status: "Active" },
];

function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [students, setStudents] = useState(studentList);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    setIsLoading(false);
  }, [navigate]);

  const handleSuspendStudent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: student.status === "Active" ? "Suspended" : "Active" } : student
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Student Management</h1>
          <div className="flex items-center gap-2">
            <DevPanel />
            <div className="hidden md:block">
              <NotificationBell />
            </div>
            <Button asChild>
              <Link to="/students/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <Input
                placeholder="Search by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.department}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Active" ? "outline" : "destructive"}>{student.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/students/${student.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">View</span>
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/students/edit/${student.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant={student.status === "Active" ? "destructive" : "outline"}>
                              <UserX className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">
                                {student.status === "Active" ? "Suspend" : "Activate"}
                              </span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {student.status === "Active" ? `Suspend ${student.name}?` : `Activate ${student.name}?`}
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
                                onClick={() => handleSuspendStudent(student.id)}
                                className={student.status === "Active" ? "bg-destructive" : ""}
                              >
                                {student.status === "Active" ? "Suspend" : "Activate"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StudentsPage;