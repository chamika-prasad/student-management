import React, { useContext, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userContext } from "context";
import "./index.css";

export const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { userType, setUserType } = useContext(userContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log("username : ", username);
    console.log("password : ", password);
    if(username === "admin") {
      setUserType("admin");
    }else{
      setUserType("user");
    }
    navigate("/");
    
  };

  return (
    <div className="login-page-wrapper">
      <div className="input-fields-wrapper">
        <Typography variant="h4" className="signin-typography">
          Sign In
        </Typography>
        <TextField
          label="Email"
          fullWidth
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          label="Password"
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="outlined" size="large" onClick={handleSignIn}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};
