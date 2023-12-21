import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const TheatrePrice = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [show, setShow] = useState({ price: "", numberOfPeople: "" });
  const [open, setOpen] = React.useState(false);
  const [isMaxi, setIsMaxi] = useState(true);

  const handleClickOpen = (item, isMaxi) => {
    setEdit(item);
    setShow(isMaxi ? data[item] : data1[item]);
    setOpen(true);
    setIsMaxi(isMaxi);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const endpoint = isMaxi
        ? `https://binge-be.onrender.com/updatemaxi/${data[edit]._id}`
        : `https://binge-be.onrender.com/updatemini/${data1[edit]._id}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(show),
      });

      if (response.ok) {
        console.log(
          `${isMaxi ? "MAXI" : "MINI"} Theater data updated successfully!`
        );
        isMaxi ? fetchData() : fetchData1();
        handleClose();
      } else {
        console.error(
          `Failed to update ${isMaxi ? "MAXI" : "MINI"} theater data`
        );
      }
    } catch (error) {
      console.error(
        `Error updating ${isMaxi ? "MAXI" : "MINI"} theater data:`,
        error
      );
    }
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch("https://binge-be.onrender.com/getmini");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const trans = await response.json();
        setData1(trans);
      } catch (error) {
        console.log(error, "display error message");
      }
    };

    fetchData1();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getmaxi");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const trans = await response.json();
      setData(trans);
    } catch (error) {
      console.log(error, "error message");
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getmini");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const trans = await response.json();
      setData1(trans);
    } catch (error) {
      console.log(error, "error message");
    }
  };

  return (
    <div>
      <div>
        <h2>MAXI</h2>
        {data.map((ele, ind) => (
          <div key={ind}>
            <p>
              Price: {ele.price}
              <Button onClick={() => handleClickOpen(ind, true)}>edit</Button>
            </p>
            <p>
              Number Of People: {ele.numberOfPeople}
              <Button onClick={() => handleClickOpen(ind, true)}>edit</Button>
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2>MINI</h2>
        {data1.map((ele, ind) => (
          <div key={ind}>
            <p>
              Price: {ele.price}{" "}
              <Button onClick={() => handleClickOpen(ind, false)}>edit</Button>
            </p>
            <p>
              Number of People: {ele.numberOfPeople}{" "}
              <Button onClick={() => handleClickOpen(ind, false)}>edit</Button>
            </p>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Theater</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={show.price}
            onChange={changeHandler}
            name="price"
          />
          <TextField
            margin="dense"
            id="numberOfPeople"
            label="Number of People"
            type="text"
            fullWidth
            variant="standard"
            value={show.numberOfPeople}
            onChange={changeHandler}
            name="numberOfPeople"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TheatrePrice;
