import { useState, useEffect, useContext } from "react";
import { DataContext } from "./APIContext";
import { useDeleteRow } from "./Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@mui/material";
import { Button, TextField, Box } from "@mui/material";

export const DisplayAPIData = () => {

  // const [data,setData] = useState<any>([]);
  const [updatedData, setUpdatedData] = useState<any>({ name: "", city: "" });
  const { dataAPI, saveAPIData, updateData } = useContext(DataContext);
  // useDeleteRow( saveAPIData);

  const fetchData = async () => {
    const response = await fetch('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
    if (!response.ok) {
      throw new Error('Data could not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
    if (dataAPI!) {
      fetchData()
        .then((res: any) => {
          // setData(res);
          saveAPIData(res);
        })
        .catch((error: any) => {
          console.log(error.message)
        })
    }
  }, [])

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUpdatedData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value
    }));

  }

  const handleEdit = (record: any) => {
    setUpdatedData(record);
  };

  const handleSubmit = (e: any, updatedData: any, data: any) => {
    e.preventDefault();
    const { name, city } = updatedData;
    updateData(name, city, data);
    setUpdatedData({ name: "", city: "" });
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
        <form>
          <TextField
            type="text"
            margin="normal"
            name="name"
            value={updatedData.name}
            label="Name"
            // placeholder="Enter Name for Record"
            onChange={handleChange}

          /><br />
          <TextField
            type="text"
            margin="normal"
            name="city"
            value={updatedData.city}
            label="city"
            // placeholder="Enter Name for Record"
            onChange={handleChange}

          /><br />
          <Button onClick={(event) => handleSubmit(event, updatedData, dataAPI)}>Submit</Button>
        </form>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataAPI.map((record: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.city}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  )
}

