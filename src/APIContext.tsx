import { createContext, useState ,ReactNode} from "react";

type ContextType = {
    dataAPI: any;
    updateData: ( name:string, city:string,data:any) =>void;
    saveAPIData: (data:any) => void;
    }

export const DataContext = createContext<ContextType>(null!);

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [dataAPI, setDataAPI] = useState<any>([]);

  const updateData = ( name: string, city: string, data: any) => {
    const newData = data.map((record: any) => {
      if (record.name === name) {
        return {...record, city:city };
      } 
      return record;
    });
    setDataAPI(newData);
  };

  const saveAPIData = (data:any) => {
    setDataAPI(data);
  };

  return (
    <DataContext.Provider value={{dataAPI, updateData, saveAPIData}}>
    {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
