import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Context } from "./context";
import {useContext} from "react";

export const Home = () => {
  const navigate = useNavigate();
  const { logout } = useContext(Context);

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
