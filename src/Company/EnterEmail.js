import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [validEmail, setValidEmail] = useState(true);
  const [obj, setLoginID] = useState({
    company_email: "",
  });

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLoginID({ ...obj, company_email: email });
    setValidEmail(validateEmail(email));
  };
  
  const validateEmail = (email) => {
    // Regular expression for validating email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const onHandleForgot = async () => {

    if (!obj.company_email || !validEmail) {
      setAlert({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error"
      });
      return;
    }

    try {
      let res = await axios.post(
        "http://localhost:5001/company/company_forgot_password",
        obj
      );
      if (res.data.isSuccess === true) {
        console.log(res)
        console.log("Success");
        setAlert({
          open: true,
          message: "Email sent successfully!",
          severity: "success"
        })
      }
      if (res.data.isSuccess === false) {
        // toNavigate(`/errorpage`);
        setAlert({
          open: true,
          message: "Oops! Something went wrong.",
          severity: "error"
        })
        console.log(res)
        console.log("Error");
      }

    } catch (err) {
      console.log("Error:", err);
      setAlert({
        open: true,
        message: "Oops! Something went wrong.",
        severity: "error"
      });
    }
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        {/* <Container component="main" maxWidth="xs"> */}
          <div
            style={{
              // background: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '600px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          >
            <Typography component="h1" variant="h5" style={{ color: "white" }}>
              Enter Email
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid padding={3} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Name"
                    variant="outlined"
                    name="email"
                    onChange={handleEmailChange}
                    error={!validEmail || !obj.company_email}
                    helperText={!validEmail || !obj.company_email ? "Please enter a valid email address." : ""} // Display appropriate error message
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ style: { color: "white" } }}
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      },
                    }}
                    placeholder="Enter Your User Name"
                  />
                </Grid>
              </Grid>
              <ButtonGroup
                color="primary"
                orientation="vertical"
                size="large"
                aria-label="large button group"
                style={{ width: "100%" }}
              >
                <Button
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                  }}
                  type="button"
                  value="login"
                  onClick={() => {
                    onHandleForgot();
                  }}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Box>
          </div>
        {/* </Container> */}
      </div>
      {alert.open && (
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999 }}
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
}

export default EnterEmail;
