import { useContext, useEffect } from "react";
import { Context } from "./context";

export const useDeleteRow = () => {
  const { records, handleDelete } = useContext(Context);

  useEffect(() => {
    const interval = setInterval(() => {
      if (records.length > 0) {
        const index = Math.floor(Math.random() * records.length);
        const recordToDelete = records[index];
        handleDelete(recordToDelete, records);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [records, handleDelete]);
};
