import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import   {authContext}   from "./Auth";
import {useContext} from "react";

export const Home = () => {
  const navigate = useNavigate();
  const {logout} = useContext(authContext);

  return (
    <div>
      <Button
        title="Click"
        onClick={() => {
          navigate("/add ");
        }}
      >
        Open to do
      </Button>
      <br />
      <Button
        onClick={() => {
          logout(() => navigate('/'));
        }}
      >
        Logout
      </Button>
    </div>
  );
};
