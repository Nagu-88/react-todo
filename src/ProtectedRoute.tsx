import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context";
import { Home } from "./Home";
import { Add } from "./Add";
import { Display } from "./Display";

const ProtectedRoute = (Component: any) => {
  const AuthenticatedComponent = (props: any) => {
    const { userDetails } = useContext(Context);

    if (!userDetails.email) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
  return AuthenticatedComponent;
};

export const ProtectedHomeComponent = ProtectedRoute(Home);
export const ProtectedAddComponent = ProtectedRoute(Add);
export const ProtectedDisplayComponent = ProtectedRoute(Display);


