import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "components/pages/Login";
import Dashboard from "components/pages/DashBoard";
import RootLayout from "components/templates/RootLayout";
import StudentsPage from "components/pages/Students/DashBoard";
import StudentDetailPage from "components/pages/Students/Student";
import AddStudentPage from "components/pages/Students/Add";
import EditStudentPage from "components/pages/Students/Edit";
import AccessLogsPage from "components/pages/Alert";
import "./../styles/globals.css";

export const AppRotes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/alerts" element={<AccessLogsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/students/add" element={<AddStudentPage />} />
        <Route path="/students/edit/:id" element={<EditStudentPage />} />
      </Route>
    </Routes>
  );
};
