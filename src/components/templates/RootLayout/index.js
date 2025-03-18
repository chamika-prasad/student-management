import React from "react";
import ThemeProvider from "providers/ThemeProvider";
import NotificationToast from "components/molecules/NotificationToast";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen font-inter">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Outlet />
        <NotificationToast />
      </ThemeProvider>
    </div>
  );
}

export default RootLayout;
