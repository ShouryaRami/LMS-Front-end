import React from 'react';
import { Avatar, Button, Container, Grid, Typography } from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


function AdminProfile() {

  let toNavigate = useNavigate()


  // Mock user data
  const user = {
    name: 'Shourya Rami',
    address: 'Tech Nishal',
    contactNumber: '1234567890',
    email: 'jsadsad@ncjsnc.com',
    avatar: 'https://via.placeholder.com/150', // Placeholder image URL
  };

  const handleEditDetails = () => {
    // Handle edit details button click
  };


  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 64px - 128px)', display: 'flex', flexDirection: 'column', paddingTop: 4, paddingBottom: 4 }}>
        <Grid container>
          <Grid item>
            <Avatar alt={user.name} src={user.avatar} sx={{ width: 150, height: 150, marginRight: 2 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="subtitle1" gutterBottom>Name: {user.name}</Typography>
            <Typography variant="subtitle1" gutterBottom>Address: {user.address}</Typography>
            <Typography variant="subtitle1" gutterBottom>Contact Number: {user.contactNumber}</Typography>
            <Typography variant="subtitle1" gutterBottom>Email: {user.email}</Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 4 }}>
        <Button variant="contained" color="primary" onClick={handleEditDetails} sx={{ mr: 2 }}>
          Edit Details
        </Button>
        <Button variant="contained" onClick={() => { toNavigate('/Admin/Dashboard') }}>
          Back
        </Button>
      </Container>
    </>
  );
};

export default AdminProfile;
