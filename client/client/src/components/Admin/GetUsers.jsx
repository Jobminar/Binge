import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

const GetUsers = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getusers");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  return (
    <div>
      <h2>Booking</h2>

      <table>
        <thead style={{ textAlign: "center", color: "black" }}>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.sNo}</td>
              <td style={{ cursor: "pointer" }} onClick={handleClickOpen}>
                {user.name}
              </td>
              <td>{user.mobile}</td>
              <td>{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Extras</DialogTitle>
          <DialogContent>
            <Box>
              <TextField
                id="standard-basic"
                label="Enter item name"
                variant="standard"
              />
              <TextField id="standard-basic" label="Price" variant="standard" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default GetUsers;
