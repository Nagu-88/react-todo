import {  Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./Auth";
import { Home } from "./Home";
import {Add} from "./Add";
import { Display } from "./Display";

const ProtectedRoute = (Component: any) => {
  const AuthenticatedComponent = (props: any) => {
    const { user } = useContext(authContext);
    
    if (!user.email) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
  return AuthenticatedComponent;
};

export const ProtectedHomeComponent = ProtectedRoute(Home);
export const ProtectedAddComponent = ProtectedRoute(Add);
export const ProtectedDisplayComponent= ProtectedRoute(Display);


