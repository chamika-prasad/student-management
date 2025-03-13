import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./index.css";

const columns = [
  { id: "id", label: "No.", minWidth: 170 },
  { id: "studentNo", label: "Student Id", minWidth: 100 },
  {
    id: "timestamp",
    label: "Time Stamp",
    minWidth: 170,
  },
  {
    id: "type",
    label: "In / Out",
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
];

const dataArray = [
  { studentNo: 123456, timestamp: "2025-03-25T12:34:56.789Z", type: "in" },
  { studentNo: 654321, timestamp: "2025-03-25T12:35:56.789Z", type: "out" },
  { studentNo: 112233, timestamp: "2025-03-25T12:36:56.789Z", type: "in" },
  { studentNo: 445566, timestamp: "2025-03-25T12:37:56.789Z", type: "out" },
  { studentNo: 789012, timestamp: "2025-03-25T12:38:56.789Z", type: "in" },
  { studentNo: 987654, timestamp: "2025-03-25T12:39:56.789Z", type: "out" },
  { studentNo: 654321, timestamp: "2025-03-25T12:35:56.789Z", type: "out" },
  { studentNo: 112233, timestamp: "2025-03-25T12:36:56.789Z", type: "in" },
  { studentNo: 445566, timestamp: "2025-03-25T12:37:56.789Z", type: "out" },
  { studentNo: 789012, timestamp: "2025-03-25T12:38:56.789Z", type: "in" },
  { studentNo: 987654, timestamp: "2025-03-25T12:39:56.789Z", type: "out" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const Attendance = () => {
  const [type, setType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value === "Attendance") {
      const uniqueArray = dataArray.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.studentNo === value.studentNo)
      );

      setFilteredData(uniqueArray);
    } else {
      setFilteredData([]);
    }
  };

  const handleSearchValueChange = (event) => {
    const filterValue = event.target.value;
    const filteredArray = dataArray.filter((item) =>
      item.studentNo.toString().includes(filterValue)
    );
    setFilteredData(filteredArray);
  };

  const handleArray = () => {
    return filteredData.length > 0 ? filteredData : dataArray;
  };

  return (
    <div className="admin-attendance-wrapper">
      <div className="admin-attendance-top-row">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Select</InputLabel>
          <Select value={type} label="Select" onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Attemps">Attemps</MenuItem>
            <MenuItem value="Attendance">Attendance</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search here.."
          id="outlined-size-small"
          size="small"
          onChange={handleSearchValueChange}
        />
      </div>
      <div className="admin-attendance-middle-row">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 430 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleArray().map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value ? value : index + 1}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};
