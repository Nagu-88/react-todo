import { Button, TextField, Box, FormControl } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./context";
import { users } from "./user";

export const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(Context);


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setError(false);
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleLogin = (loginFormData: { email: string, password: string }) => {
    const { email, password } = loginFormData;
    const loginCredentials = users.find(
      (userLoginDetails: { email: string; password: string }) => userLoginDetails.email === email && userLoginDetails.password === password
    );
    if (loginCredentials) {
      setError(false);
      setErrorMessage("");
      login(loginCredentials, () => {
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
        <FormControl>
          <TextField
            type="text"
            margin="normal"
            name="email"
            value={loginFormData.email}
            label="Email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <TextField
            type="password"
            margin="normal"
            name="password"
            value={loginFormData.password}
            label="Password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Button onClick={() => { handleLogin(loginFormData) }}>
            Login
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
