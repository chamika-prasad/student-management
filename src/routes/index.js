import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "components/templates";
import { AdminHome } from "components/page/admin";
import { SecurityHome } from "components/page/security";
import { LoginPage, Attendance } from "components/page/common";
import { userContext } from "context";

export const AppRotes = () => {
  const { userType } = useContext(userContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            userType == "admin" ? (
              <AdminHome />
            ) : userType == "user" ? (
              <SecurityHome />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/attendance" element={<Attendance />} />
      </Route>
    </Routes>
  );
};
