import React, { useState } from "react";
import LoginImage from "./login-image.jpg";
import "./Login.css";
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
      }
      if (res.data.isSuccess === false) {
        toNavigate(`/errorpage`);
      }
    } catch (err) {
      console.log("err");
      setAlert(true);
    }
  };

  let onHandleForgot = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5001/company/company_forgot_password",
        obj
      );

      if (res.data.isSuccess === true) {
        console.log(res)
     }
     if (res.data.isSuccess === false) {
          toNavigate(`/errorpage`);
          console.log(res)
      }
    } catch (err) {
      console.log("err");
      setAlert(true);
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <div className="login-image">
          <img src={LoginImage} alt="" />
        </div>
        <div className="login-container">
          <div className="login-wrapper">
            <div className="login-field">
              <div>Enter Username</div>
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                onChange={(e) =>
                  setLoginID({ ...obj, company_email: e.target.value })
                }
                style={{
                  width: "100%",
                  fontWeight: "bold",
                }}
                type="text"
                name="user_name"
                placeholder="Enter Your User Name"
              />
            </div>
            <div className="login-field">
              <div>Enter Password</div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) =>
                  setLoginID({ ...obj, company_password: e.target.value })
                }
                style={{ width: "100%" }}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </div>
            <ButtonGroup
              color="primary"
              orientation="vertical"
              size="large"
              aria-label="large button group"
              style={{ width: "100%" }}
            >
              <Button
                color="primary"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px", // Adding space between buttons
                }}
                className="login-button"
                onClick={() => {
                  onHandleClick();
                }}
                type="submit"
                value="login"
              >
                Login
              </Button>
              <Button
                color="primary"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px", // Adding space between buttons
                }}
                className="login-button"
                onClick={() => {
                  onHandleForgot();
                }}
                type="submit"
                value="login"
              >
                Forgot Password ?
              </Button>

              <div>{"Don't have account?"}</div>
              <Link
                href="/Company_Registration"
                underline="hover"
                style={{ color: "white" }}
              >
                {"Sign Up?"}
              </Link>
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

export default LoginCompany;
