import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "components/pages/Login";
import Dashboard from "components/pages/DashBoard";
import RootLayout from "components/templates/RootLayout";
import "./../styles/globals.css";

export const AppRotes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
