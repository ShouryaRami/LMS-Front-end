// import React, { useState } from 'react';
// import { Box, Button, ButtonGroup, Container, Grid, TextField, Typography } from '@mui/material';

// function PasswordReset() {
//   const [password, setPassword] = useState('');
//   const [verifyPassword, setVerifyPassword] = useState('');
//   const [passwordsMatch, setPasswordsMatch] = useState(true);

//   const handleChangePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleChangeVerifyPassword = (event) => {
//     setVerifyPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (password === verifyPassword) {
//       // Passwords match, proceed with password change
//       console.log('Password changed successfully');
//       // Add your password change logic here
//     } else {
//       // Passwords do not match, show error message or handle accordingly
//       console.log('Passwords do not match');
//       setPasswordsMatch(false);
//     }
//   };

//   return (
//     <div>
//       <Container component='main' maxWidth='xs'>
//         <Box
//           sx={{
//             paddingTop: '15%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Enter New Password
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid padding={3} container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   type="text"
//                   id="password"
//                   label="Enter Password"
//                   name="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={handleChangePassword}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   type="text"
//                   id="verify-password"
//                   label="Verify Password"
//                   name="verifyPassword"
//                   autoComplete="new-password"
//                   value={verifyPassword}
//                   onChange={handleChangeVerifyPassword}
//                   error={!passwordsMatch}
//                   helperText={!passwordsMatch && "Passwords do not match"}
//                 />
//               </Grid>
//             </Grid>
//             <ButtonGroup
//               color="primary"
//               orientation="vertical"
//               size="large"
//               aria-label="large button group"
//               style={{ width: "100%" }}
//             >
//               <Button
//                 color="primary"
//                 style={{
//                   backgroundColor: "rgb(0,0,0,0.5)",
//                 }}
//                 type="submit"
//                 value="login"
//               >
//                 Change Password
//               </Button>
//             </ButtonGroup>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default PasswordReset;
///////////////////
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

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeVerifyPassword = (event) => {
    setVerifyPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === verifyPassword) {
      // Passwords match, proceed with password change
      console.log("Password changed successfully");
      // Add your password change logic here
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
