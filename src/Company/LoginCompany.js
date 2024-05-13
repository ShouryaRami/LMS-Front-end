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
import background from '../Company/faded_gallery-deT70U8v4os-unsplash.jpg'


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
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        backgroundImage: "url("+background+")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxSizing: "border-box",
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          minHeight: "auto",
          height: "auto",
          width: "45%",
          background: "rgba(74, 144, 226, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "white",
              background: "linear-gradient(to right, #ffefba, #ffffff)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Login In
          </h1>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              onChange={(e) =>
                setLoginID({ ...obj, company_email: e.target.value })
              }
              InputProps={{
                style: { color: "white" },
                classes: { notchedOutline: "outlined-white" },
              }}
              InputLabelProps={{ style: { color: "white" } }}
              type="text"
              name="user_name"
              placeholder="Enter Your User Name"
            />
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e) =>
                setLoginID({ ...obj, company_password: e.target.value })
              }
              InputProps={{
                style: { color: "white", width:"100%" },
                classes: { notchedOutline: "outlined-white" },
              }}
              InputLabelProps={{ style: { color: "white" } }}
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
            style={{ width: "58%" }}
          >
            <Button
              color="primary"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "10px",
                borderColor: "white",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "10px",
                borderColor: "white",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              onClick={() => {
                toNavigate("/EnterEmail");
              }}
            >
              Forgot Password?
            </Button>
            <div style={{ color: "white" }}>{"Don't have an account?"}</div>
            <Link
              href="/Company_Registration"
              underline="hover"
              style={{ color: "white", marginTop: "10px" }}
            >
              Sign Up
            </Link>
            <br />
          </ButtonGroup>
        </div>
        {alert && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "20px",
              }}
            >
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
