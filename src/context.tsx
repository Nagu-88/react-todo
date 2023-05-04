import { createContext, useState, ReactNode } from "react";
import { Record } from "./App";
import { useRecordManagement } from "./Reducer";

type ContextType = {
  records: Record[];
  handleUpdate: (updatedRecord: Record) => void;
  handleDelete: (deletedRecord: Record) => void;
  handleSave: (newRecord: Record) => void;
  userDetails: {email: string, password: string} ;
  login: (user:{email: string, password: string}, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
  successMessage: boolean;
};

export const Context = createContext<ContextType>({
  records: [],
  handleUpdate: () => { },
  handleDelete: () => { },
  handleSave: () => { },
  userDetails: {email:"",password:""},
  login: () => { },
  logout: () => { },
  successMessage: false
  

});

export const RecordContext = ({ children }: { children: ReactNode }) => {
  const { handleSave, handleUpdate, handleDelete, records, successMessage } = useRecordManagement();

  const [userDetails, setUserDetails] = useState({ email: "" ,password: "" });
    
  const login = (loginCredentials: { email: string; password: string }, callback: VoidFunction) => {
    setUserDetails(loginCredentials);
     callback();
  };

  const logout = (callback: VoidFunction) => {
    setUserDetails({ email: "" ,password: "" });
     callback();

  }

  return (
    <Context.Provider
        value={{
          records, handleSave, handleUpdate, handleDelete, successMessage, userDetails, login, logout
        }}
      >
      {children}
    </Context.Provider>
  );
};
