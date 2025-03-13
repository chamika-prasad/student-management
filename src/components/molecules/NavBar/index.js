import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { userContext } from "context";
import "./index.css";

export const NavBar = () => {
  const { userType } = useContext(userContext);
  let location = useLocation();
  useEffect(() => {
    console.log("location.pathname : ", location.pathname);
  }, [location.pathname]);

  return (
    <div className="navbar-wrapper">
      <Typography variant="h6">Logo</Typography>
      <div className="nav-link-wrapper">
        <NavLink to="/" className="nav-link">
          {location.pathname === "/" ? (
            <div className="active-indicator"></div>
          ) : null}
          Home
        </NavLink>
        {userType == "admin" ? (
          <NavLink to="/students" className="nav-link">
            {location.pathname === "/students" ? (
              <div className="active-indicator"></div>
            ) : null}
            Students
          </NavLink>
        ) : null}

        <NavLink to="/attendance" className="nav-link">
          {location.pathname === "/attendance" ? (
            <div className="active-indicator"></div>
          ) : null}
          Attendances
        </NavLink>
      </div>
    </div>
  );
};
