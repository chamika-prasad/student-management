import React from "react";
import { CountCard } from "components/molecules";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import "./index.css";

const getDatesAndCounts = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based (Jan = 0, Feb = 1, etc.)

  const dates = [];
  const counts = [];

  for (let day = 1; day <= today.getDate(); day++) {
    const date = new Date(year, month, day);
    const formattedDate = `${String(day).padStart(2, "0")}-${String(
      month + 1
    ).padStart(2, "0")}`;

    dates.push(formattedDate); // Push "MM-DD" format
    counts.push(Math.floor(Math.random() * 500) + 10);
  }

  return { dates, counts };
};

export const AdminHome = () => {
  const { dates, counts } = getDatesAndCounts();

  return (
    <div className="admin-home-wrapper">
      <div className="admin-top-count-row">
        <CountCard
          title="TOTAL STUDENT COUNT"
          date="2025 - 03 - 25"
          count="450"
        />
        <CountCard
          title="LIVE STUDENT COUNT"
          date="2025 - 03 - 25"
          count="320"
        />
      </div>
      <div className="admin-middle-chart-row">
        <Typography variant="h4" component="div">
          ATTENDANCE - {new Date().toLocaleString("default", { month: "long" }).toUpperCase()}
        </Typography>
        <LineChart
          xAxis={[{ scaleType: "point", data: dates }]} // Dates on X-axis
          series={[{ data: counts }]} // Counts on Y-axis
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
};
