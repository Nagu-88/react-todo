import { useEffect, useContext} from "react";
import { Context } from "./context";
// import { useRecordManagement } from "./Reducer";

export const useDeleteRow = () => {
  // const {  handleDelete, records } = useRecordManagement();
  // const {handleDelete, records} = useContext(Context)
  const { handleDelete, records } = useContext(Context);

  useEffect(() => {
    const interval = setInterval(() => {
      if (records.length > 0) {
        const index = Math.floor(Math.random() * records.length);
        const recordToDelete = records[index];
        handleDelete(recordToDelete);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [records, handleDelete]);
};
