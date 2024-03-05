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
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {

  
let toNavigate = useNavigate();
const [alert, setAlert] = useState(false);
const [obj, setLoginID] = useState({
  company_email: "",
});

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
            Enter Email
          </Typography>
          <Box component="form"  sx={{ mt: 3 }}>
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
                onChange={(e) =>
                  setLoginID({ ...obj, company_email: e.target.value })
                }
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
                  //    border: "1px solid white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    // border: "1px solid white",
                  },
                }}
                type="submit"
                value="login"
                onClick={() => {
                  onHandleForgot();
                }}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default EnterEmail;
