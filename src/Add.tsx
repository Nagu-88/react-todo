import { v4 as uuid } from "uuid";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Context } from "./context";
import { Display } from "./Display";
import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";

// interface Props {
//   save: (record: { id: number; name: string }) => void;
// }

export const Add = () => {
  const { handleSave,saveAPIData } = useContext(Context);

  const [name, setName] = useState({name:"", city:""});
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uniqueId = uuid();

  const regex = /^[a-zA-Z/s]*$/;

  const handleChange = (event: any) => {
    event.preventDefault();
    // if (event.target.value.match(regex)) {
      // setError(false);
      // setErrorMessage("");
      // setName(event.target.value);
      const { name, value } = event.target;
      setName((prevFormData: any) => ({
            ...prevFormData,
            [name]: value
          }));
    
      setSuccessMessage(false);
    // } else {
    //   setError(true);
    //   setErrorMessage("Please enter alphabetic characters only");
    // }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newData = {
      id: parseInt(uniqueId, 10),
      name: name.name,
      city:name.city
    };
    // props.save(newData);
    handleSave(newData);
    setName({name:"", city:""});
    setSuccessMessage(true);
  };

  const fetchData = async () => {
    const response = await fetch('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
    if (!response.ok) {
      throw new Error('Data could not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
   
      fetchData()
        .then((res: any) => {
          
          saveAPIData(res);
        })
        .catch((error: any) => {
          console.log(error.message)
        })
    
  }, [])

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
        <form>
          <TextField
            type="text"
            margin="normal"
            name="name"
            value={name.name}
            label="Name"
            placeholder="Enter Name for Record"
            onChange={handleChange}
            error={error}
            helperText={errorMessage}
          />
          <br />
          <TextField
            type="text"
            margin="normal"
            name="city"
            value={name.city}
            label="City"
            placeholder="Enter city for Record"
            onChange={handleChange}
            error={error}
            helperText={errorMessage}
          />
          {successMessage && (
            <Typography>Record added Successfully!</Typography>
          )}
          <br />

          <Button onClick={handleSubmit}>Submit</Button>
          <br />

          {/* <Link to="/display">LIST OF RECORDS</Link> */}
        </form>
      </Box>
      <div>
        <Display />
      </div>

    </>
  );
};
