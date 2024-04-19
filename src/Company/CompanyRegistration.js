
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Login.css";
import { ButtonGroup } from '@mui/material';




const defaultTheme = createTheme();

export default function CompanyRegistration() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className='login-body'>
    <div className="login-box">
      <div className="login-heading">
          <Typography component="h1" variant="h5">
            Register Your Company
          </Typography>
          <Box className='login-container' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="companyName"
                  label="Company Name"
                  varient="outlined"
                  name="companyName"
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
                  placeholder="Enter Your Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="companyemail"
                  label="Email"
                  varient="outlined"
                  required
                  fullWidth
                  name="companyemail"
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
                  placeholder="Enter Email ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact_number"
                  label="Contact Number"
                  name="contact_number"
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
                  placeholder="Enter Email ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Address"
                  label="Address"
                  name="Address"
                  type="Address"
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
                  placeholder="Enter Email ID"
                  autoFocus
                />
              </Grid> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="logo"
                  label="Logo"
                  name="logo"
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
                  placeholder="Enter Email ID"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
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
                  placeholder="Enter Email ID"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Verify Password"
                  name="password"
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
                  placeholder="Enter Email ID"
                  autoFocus
                  />
              </Grid>
            </Grid>
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
                  marginTop:"15px", 
                  marginBottom: "10px", // Adding space between buttons
                }}
                className="login-button"
                // onClick={() => {
                //   onHandleClick();
                // }}
                type="submit"
                value="login"
              >
                Login
              </Button>
              </ButtonGroup>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
      </div>
    </div>
    </div>
  );
}