import { createContext, useState, ReactNode } from "react";

type ContextType = {
user: any;
login: (user: {email: string, password: string},callback: VoidFunction) =>void;
logout: (callback: VoidFunction) => void;
};

export const authContext = createContext<ContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>({ email: "" ,password: "" });
    

    console.log("authuser", user);
   

  const login = (userDetails: { email: string; password: string }, callback: VoidFunction) => {
    console.log("loginparameter", userDetails);
    setUser(userDetails);
     callback();
  };
  console.log("user",user);

  const logout = (callback: VoidFunction) => {
    setUser(null);
     callback();

  }

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};


