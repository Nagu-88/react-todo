import { createContext, useState, ReactNode } from "react";
import { Record } from "./App";
import { v4 as uuidv4 } from 'uuid';

type ContextType = {
  records: Record[];
  handleUpdate: (updatedRecord: Record, prevRecords: Record[]) => void;
  handleDelete: (deleteRecord: Record, prevRecords: Record[]) => void;
  handleSave: (record: { id: number; name: string, city:string }) => void;
  saveAPIData: (data: any) => void;
};

export const Context = createContext<ContextType>({
  records: [],
  handleUpdate: () => {},
  handleDelete: () => {},
  handleSave: () => {},
  saveAPIData: () => {}
});

export const RecordContext = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<Record[]>([]);

  const handleSave = (currentrecord: Record) => {
    const recordsClone = [...records];
    recordsClone.push(currentrecord);
    setRecords(recordsClone);
  };

  const handleUpdate = (updatedRecord: Record, prevRecords: Record[]) => {
    const { id, name } = updatedRecord;
    const updatedData = prevRecords.map((item) => {
      const { id: itemId } = item;
      const cloneRecord = { ...item };
      if (itemId === id) {
        // return { ...item, name: name };
        return { ...cloneRecord, name: name };
      }
      return cloneRecord;
    });
    setRecords(updatedData);
  };

  const handleDelete = (deleteRecord: Record, prevRecords: Record[]) => {
    const { id } = deleteRecord;
    const filteredRecords = prevRecords.filter(
      ({ id: itemId }) => itemId !== id
    );
    setRecords(filteredRecords);
  };

  const saveAPIData = (data:any) => {
    const recordsWithId = data.map((record:any) => {
      return { ...record, id: uuidv4() };
    });
    setRecords(recordsWithId);
  };

  return (
    <Context.Provider
      value={{ records, handleSave, handleUpdate, handleDelete, saveAPIData }}
    >
      {children}
    </Context.Provider>
  );
};
