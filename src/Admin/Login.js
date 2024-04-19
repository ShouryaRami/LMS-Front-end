import React, { useState } from "react";
import LoginImage from "./login-image.jpg";
import "./Login.css";
import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [obj, setLoginID] = useState({
    admin_username: "",
    admin_password: "",
  });
  const [alert, setAlert] = useState(false);

  let toNavigate = useNavigate();

  let onHandleClick = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5001/admin/admin_login",
        obj
      );

      if (res.data.isSuccess === true) {
        localStorage.setItem("admin_token", res.data.admin_token);
        toNavigate("/Admin/Dashboard");
      } else {
        setAlert(true);
      }
    } catch (err) {
      console.log("err");
      setAlert(true);
    }
  };

  return (
    <div className="login-body">
        <div className="login-box">
          <div className="login-heading">
            <h1>Login In</h1>
          </div>
        <div className="login-container">
          <div className="login-wrapper">
            <div className="login-field">
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                onChange={(e) =>
                  setLoginID({ ...obj, admin_username: e.target.value })
                }
                style={{
                  width: "100%",
                  color: "white",
                  fontWeight: "bold",
                }}
                InputProps={{
                  style: { color: "white" },
                  classes: { notchedOutline: "outlined-white" }, // Custom class for border
                }}
                InputLabelProps={{ style: { color: "white" } }}
                type="text"
                name="user_name"
                placeholder="Enter Your User Name"
              />
            </div>
            <div className="login-field">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) =>
                  setLoginID({ ...obj, admin_password: e.target.value })
                }
                style={{ width: "100%", color: "white" }}
                  InputProps={{
                    style: { color: "white" },
                    classes: { notchedOutline: "outlined-white" }, // Custom class for border
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
              />
            </div>
            <ButtonGroup
              color="primary"
              disabled={false}
              orientation="vertical"
              size="large"
              aria-label="large button group"
              style={{ width: "100%" }}
            >
              <Button
                color="primary"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "10px",
                  borderColor:"white",
                  borderRadius: "5px",
                  marginBottom: "10px", // Adding space between buttons
                }}
                className="login-button !important"
                onClick={() => {
                  onHandleClick();
                }}
                type="submit"
                value="login"
              >
                Login
              </Button>
              <br />
            </ButtonGroup>
          </div>
        </div>
        {alert && (
          <div className="overlay">
            <div className="alert-container">
              <Alert severity="error" onClose={() => setAlert(false)}>
                <AlertTitle>Error</AlertTitle>
                Username or password is incorrect —{" "}
                <strong>check it out!</strong>
              </Alert>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
