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
import { useParams } from "react-router-dom";
import axios from "axios";

function PasswordReset_Candidate() {
  const params = useParams();
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeVerifyPassword = (event) => {
    setVerifyPassword(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (password === verifyPassword) {
      
      try {
        let res = await axios.post(
          "http://localhost:5001/candidate/candidate_update_password",
          {
            candidate_email: params.candidate_email,
            candidate_new_password: password,
          }
        );

        if (await res.data.isSuccess === true ) {
          console.log(res);
          console.log("Success");
          setAlert({
            open:true,
            message:"Password Changed Successfully",
            severity:"success"
          })
        }
        if (await res.data.isSuccess === false) {
          console.log(res);
          console.log("Error");
          setAlert({
            open:true,
            message:"Oops! Something went wrong.",
            severity:"error"
          })
        }
      } catch (err) {
        console.log("Error", err);
        setAlert({
          open: true,
          message: "Oops! Something went wrong.",
          severity: "error"
        });
      }
    } else {
      // Passwords do not match, show error message or handle accordingly
      setAlert({
        open: true,
        message: "Password Do not Match",
        severity: "error"
      })
      console.log("Passwords do not Match");
      setPasswordsMatch(false);
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
          <Typography component="h1" color={"black"} variant="h5" style={{ color: "white" }}>
            Enter New Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid padding={3} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="password"
                  label="Enter Password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChangePassword}
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="verify-password"
                  label="Verify Password"
                  name="verifyPassword"
                  autoComplete="new-password"
                  value={verifyPassword}
                  onChange={handleChangeVerifyPassword}
                  error={!passwordsMatch}
                  helperText={!passwordsMatch && "Passwords do not match"}
                  InputLabelProps={{ style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                  }}
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
                  //    border: "1px solid white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    // border: "1px solid white",
                  },
                }}
                type="submit"
                value="login"
              >
                Change Password
              </Button>
            </ButtonGroup>
          </Box>
        </div>
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

export default PasswordReset_Candidate;
