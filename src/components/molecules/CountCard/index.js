import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./index.css";

export const CountCard = (props) => {
  return (
    <Card className="admin-top-count-card">
      <CardContent
        sx={{ height: "100%" }}
        className="admin-top-count-card-content"
      >
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.date}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          {props.count}
        </Typography>
      </CardContent>
    </Card>
  );
};
