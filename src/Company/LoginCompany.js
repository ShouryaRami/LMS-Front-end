import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Link,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from '../Company/login-image.jpg'


function LoginCompany() {
  const [obj, setLoginID] = useState({
    company_email: "",
    company_password: "",
  });
  const [alert, setAlert] = useState(false);

  let toNavigate = useNavigate();

  let onHandleClick = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5001/company/company_login",
        obj
      );
      if (res.data.isSuccess === true) {
        localStorage.setItem("company_token", res.data.company_token);
        toNavigate(`/Company/Dashboard/${res.data.companyID}`);
      } else {
        setAlert(true);
      }
    } catch (err) {
      setAlert(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
     <div
        style={{
          display: "flex",
          width: "80%",
          maxWidth: "800px",
          background: "rgba(74, 144, 226, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={background}
            alt="Login Image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: 1, padding: "0 20px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "20px" }}>
            Company Login In
          </h1>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setLoginID({ ...obj, company_email: e.target.value })}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            type="text"
            name="user_name"
            placeholder="Enter Your User Name"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            onChange={(e) => setLoginID({ ...obj, company_password: e.target.value })}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            type="password"
            name="password"
            placeholder="Enter Password"
            style={{ marginBottom: "20px" }}
          />
         <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onHandleClick}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", marginBottom: "10px" }}
          >
            Login
          </Button>
          <Button
            color="primary"
            onClick={() => toNavigate("/EnterEmail")}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            Forgot Password?
          </Button>

          <div style={{ color: "white", marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link href="/Company_Registration" underline="hover" style={{ color: "white" }}>
              Sign Up
            </Link>
          </div>
          {alert && (
            <div style={{ marginTop: "20px" }}>
              <Alert severity="error" onClose={() => setAlert(false)}>
                <AlertTitle>Error</AlertTitle>
                Username or password is incorrect — <strong>check it out!</strong>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginCompany;
