import { v4 as uuid } from "uuid";
import { Button, TextField, Box, Typography, FormControl } from "@mui/material";
import { Display } from "./Display";
import { useState, useContext } from "react";
import { Context } from "./context";
// import { useRecordManagement } from "./Reducer";

export const Add = () => {
  // const { handleSave,  successMessage } = useRecordManagement();
  const {handleSave, successMessage} = useContext(Context);

  const [name, setName] = useState({ name: "", city: "" });

  const uniqueId = uuid();
  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setName((prevFormData: any) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const newData = {
      id: parseInt(uniqueId, 10),
      name: name.name,
      city: name.city
    };
    handleSave(newData);
    setName({ name: "", city: "" });
  };

  return (
    <>
      <Box
        style={{ marginBottom: "1rem" }}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <FormControl>
          <TextField
            type="text"
            margin="normal"
            name="name"
            value={name.name}
            label="Name"
            placeholder="Enter Name for Record"
            onChange={handleChange}
          />
          <TextField
            type="text"
            margin="normal"
            name="city"
            value={name.city}
            label="City"
            placeholder="Enter city for Record"
            onChange={handleChange}
          />
          {successMessage && (
            <Typography>Record added Successfully!</Typography>
          )}
          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Box>
      <div>
        <Display />
      </div>

    </>
  );
};
