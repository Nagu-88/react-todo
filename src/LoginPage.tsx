import { Button, TextField, Box } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  {authContext}  from "./Auth";
import { users } from "./user";

export const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const {login} = useContext(authContext);

  

  const handleChange = (event: any) => {
    const {name, value} = event.target;
    setError(false);
    setLoginDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleLogin = (event: any) => {
    event.preventDefault();
    console.log("users", users);
    const loginUser = users.find(
      (user: { email: string; password: string }) => user.email === loginDetails.email
    );
    console.log("login", loginUser);
    if (loginUser) {
      setError(false);
      setErrorMessage("");
    } else {
      setError(true);
      setErrorMessage("Invalid email or password");
    }
    if (loginUser && loginUser.password === loginDetails.password) {
      setError(false);
      setErrorMessage("");
      login(loginUser, () => {
        navigate("/home");
      });
    } else {
      setError(true);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <>
      <Box
        style={{ marginBottom: "1rem" }}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <form>
          <TextField
            type="text"
            margin="normal"
            name="email"
            value={loginDetails.email}
            label="Email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <br />
          <TextField
            type="password"
            margin="normal"
            name="password"
            value={loginDetails.password}
            label="Password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{errorMessage}</p>}
          <br />
          <Button  onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};
