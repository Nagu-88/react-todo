import { useState, useEffect } from "react";
import { Record } from "./App";
import { Context } from "./context";
import { Button, TextField, Typography, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@mui/material";
import { useContext } from "react";
import {useDeleteRow} from "./Delete"; 

// interface displayProps {
//   // records: Record[];
//     onUpdate: (record: Record) => void;
//     onDelete: (record: Record) => void;
// }

export const Display = () => {
  // const {  onUpdate, onDelete } = props;
  // const { records } = props;

  // const { handleUpdate, handleDelete } = useContext(Context);
  const { records, handleUpdate, handleDelete } = useContext(Context);

  // const [editName, setEditName] = useState<Record | "">("");
  const [editRecord, setEditRecord] = useState<Record>({
    id: 0,
    name: '',
    city: ''
  });
  const {id:editRecordId} = editRecord;
  const [error, setError] = useState(false);
  const [newName, setnewName] = useState<string>("");
  const [newCity, setnewCity] = useState<string>("");
  useDeleteRow();
  // const [data, setData] = useState<any>([]);

  // const editId = editName !== "" ? editName.id : null;
  // const regex = /^[a-zA-Z\s]*$/;

  const handleSave = (event: any, record: Record) => {
    event.preventDefault();
    const { id } = record;
    console.log("display", record);
    const updateData = {
      id: id,
      name:newName,
      city: newCity,
    };
    // onUpdate(updateData);
    handleUpdate(updateData, records);
    setEditRecord({ id: 0, name: '', city: '' });
  };

  const handleEdit = (record: Record) => {
    const { name, city } = record;
     console.log(record);
    setEditRecord(record);
    // setUpdatedRecord({ newName: name, newCity:city });
    setnewName(name);
    setnewCity(city);
  };

  const handleCancel = () => {
    setEditRecord({ id: 0, name: '', city: '' });
  };

  const handleDeleteRecord = (record: Record) => {
    // onDelete(record);
    handleDelete(record, records);
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
                      error={error}
                      helperText={
                        error ? "Please enter alphabetic characters only" : ""
                      }
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
                      error={error}
                      helperText={
                        error ? "Please enter alphabetic characters only" : ""
                      }
                    />
                  </TableCell>

                ) : (
                  <TableCell>{recordCity}</TableCell>
                )}
                <TableCell>
                  {editRecord && editRecordId === recordId ? (
                    <>
                      <Button onClick={(event) => handleSave(event, record)}>
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
                        className="editButton"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteRecord(record)}
                        className="deleteButton"
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
