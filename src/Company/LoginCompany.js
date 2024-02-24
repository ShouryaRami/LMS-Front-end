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
      console.log("obj-----", obj)
      console.log("res=------", res.data);
      console.log("admin_token=------", res.data.admin_token);
      localStorage.setItem("token", res.data.admin_token);
      toNavigate("/Admin/Dashboard");
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
                  setLoginID({ ...obj, admin_username: e.target.value })
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
                  setLoginID({ ...obj, admin_password: e.target.value })
                }
                style={{ width: "100%" }}
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
                  backgroundColor: "rgb(0,0,0,0.5)",
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
              
              <div>
                {"Don't have account?"}
                </div>
              <Link href="/Company_Registration" underline="hover">
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
