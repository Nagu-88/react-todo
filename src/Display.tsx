import { useState,useContext } from "react";
import { Record } from "./App";
import { Button, TextField, Typography, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@mui/material";
// import { useRecordManagement } from "./Reducer";
import { useDeleteRow } from "./Delete";
import { Context } from "./context";

export const Display = () => {

  const { handleUpdate, handleDelete, records } = useContext(Context);

  const [editRecord, setEditRecord] = useState<Record>({
    id: 0,
    name: '',
    city: ''
  });
  const { id: editRecordId } = editRecord;
  const [newName, setnewName] = useState<string>("");
  const [newCity, setnewCity] = useState<string>("");
  useDeleteRow();

  const handleSave = (record: Record) => {
    const { id } = record;
    console.log("display", record);
    const updateData = {
      id: id,
      name: newName,
      city: newCity,
    };
    handleUpdate(updateData);
    setEditRecord({ id: 0, name: '', city: '' });
  };

  const handleEdit = (record: Record) => {
    const { name, city } = record;
    setEditRecord(record);
    setnewName(name);
    setnewCity(city);
  };

  const handleCancel = () => {
    setEditRecord({ id: 0, name: '', city: '' });
  };

  const handleDeleteRecord = (record: Record) => {
    handleDelete(record);
  };

  return (
    <div>
      <Box
        style={{ marginBottom: "1rem" }}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Typography variant="h5" sx={{}}>
          List of Records
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record: Record) => {
            const { id: recordId, name: recordName, city: recordCity } = record;
            return (
              <TableRow key={recordId}>
                {editRecord && editRecordId === recordId ? (
                  <TableCell>
                    <TextField
                      type="text"
                      margin="normal"
                      value={newName}
                      name="name"
                      label="Name"
                      placeholder="Enter Name for Record"
                      onChange={(event) => setnewName(event.target.value)}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{recordName}</TableCell>
                )}
                {editRecord && editRecordId === recordId ? (
                  <TableCell>
                    <TextField
                      type="text"
                      margin="normal"
                      value={newCity}
                      name="city"
                      label="city"
                      placeholder="Enter Name for Record"
                      onChange={(event) => setnewCity(event.target.value)}
                    />
                  </TableCell>

                ) : (
                  <TableCell>{recordCity}</TableCell>
                )}
                <TableCell>
                  {editRecord && editRecordId === recordId ? (
                    <>
                      <Button onClick={() => handleSave(record)}>
                        Save
                      </Button>
                      <Button type="button" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteRecord(record)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}

        </TableBody>
      </Table>
    </div>
  );
};
