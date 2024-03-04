import React, { useState } from "react";
import {
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

function PasswordReset() {
  const params = useParams();
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
          "http://localhost:5001/company/company_update_password",
          {
            company_email: params.company_email,
            company_new_password: password,
          }
        );

        if (await res.data.isSuccess === true || res.data.isSuccess === false) {
          console.log(res);
        }
      } catch (err) {
        console.log("err", err);
        //    setAlert(true);
      }
    } else {
      // Passwords do not match, show error message or handle accordingly
      console.log("Passwords do not match");
      setPasswordsMatch(false);
    }
  };

  return (
    <div style={{ background: "#333", minHeight: "100vh" }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingTop: "15%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
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
        </Box>
      </Container>
    </div>
  );
}

export default PasswordReset;
