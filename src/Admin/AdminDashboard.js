import React, { useState, useEffect } from "react";
import AdminNavbar from "../Component/AdminNavbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
  Container,
  InputAdornment,
} from "@mui/material";
import Data from "./Data";
import { data_main } from "./Data";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
  //All state for data, dialog open and close, for dilog type (add,edit and info)
  const [data, setData] = useState(Data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    company_name: "",
    company_password: "",
    company_email: "",
    company_logo: "",
    company_contact_number: "",
    company_address: "",
  });

  //State for delete and alert
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedCompany, setDeletedCompany] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });

  //State for Email dialog alert
  const [dialogalert, setDialogAlert] = useState({ open: false, message: "" });

  //State for refreshing page
  const [refresh, setRefresh] = useState("");

  //For fetching Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fetching real data from an API endpoint
        const rdata = await data_main();
        let fdata = rdata.data;
        setData(fdata.response); // Set the real data in the state
      } catch (err) {
        console.log("data not fetched", err);
      }
    };
    fetchData();
  }, [data_main]);

  // Function to open dialog for add, edit or view company details
  const handleDialogOpen = (type, companyData) => {
    setDialogType(type);
    if (type === "edit" || type === "info") {
      setFormData(companyData);
    } else {
      setFormData({
        _id: "",
        company_name: "",
        company_password: "",
        company_email: "",
        company_logo: "",
        company_contact_number: "",
        company_address: "",
      });
    }
    setDialogOpen(true);
  };

  // Function to close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({
      _id: "",
      company_name: "",
      company_password: "",
      company_email: "",
      company_logo: "",
      company_contact_number: "",
      company_address: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add or update company details
  const handleAddOrUpdateCompany = async () => {
    //To validate Email
    if (!isValidEmail(formData.company_email)) {
      console.log("Invalid email format");
      setDialogAlert({
        open: true,
        message: "Enter Valid Email",
      });
      return;
    }
    //
    if (dialogType === "add") {
      const newCompany = { ...formData };
      try {
        let res = await axios.post(
          "http://localhost:5001/admin/addCompany",
          newCompany,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          }
        );
        // Update state with the new company data
        setData([...data, newCompany]); // Assuming the response does not contain the updated data
      } catch (err) {
        console.log("err", err);
        // Handle error
      }
    } else {
      //Edit Logic
      const updatedCompany = { ...formData };
      try {
        let res = await axios.post(
          "http://localhost:5001/admin/updateCompany",
          updatedCompany,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          }
        );
        // Update state with the updated company data
        const updatedData = data.map((item) =>
          item._id === updatedCompany._id ? updatedCompany : item
        );
        setData(updatedData);
      } catch (err) {
        console.log("err", err);
        // Handle error
      }
    }
    setRefresh(formData);
    handleDialogClose();
  };

  // Function to confirm deletion of a company
  const handleConfirmDelete = (company) => {
    setDeletedCompany(company);
    setDeleteDialogOpen(true);
  };

  // Function to delete a company
  const handleDeleteCompany = async (comp_data) => {
    //! just trying

    try {
      let res = await axios.post(
        `http://localhost:5001/admin/updateCompany`,
        {
          _id: comp_data,
          isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log("err", err);
      // setAlert(true);
    }

    // Front end deletion

    const updatedCompanies = data.filter(
      (company) => company._id !== deletedCompany._id
    );
    setData(updatedCompanies);
    setDeleteDialogOpen(false);
    setAlert({
      open: true,
      message: `Company "${
        deletedCompany && deletedCompany.company_name
      }" successfully deleted!`,
    });
    setDeletedCompany(null);
  };

  //For Search Bar
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value); // Update searchItem state as the user types
  };

  useEffect(() => {
    if (!searchItem) {
      setFilteredData(data); // If searchItem is empty, set filteredData to all data
      return;
    }
    const filtered = data.filter(
      (item) =>
        item.company_name.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.company_email.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.company_contact_number.toLowerCase().includes(searchItem.toLowerCase()) 
        // Filter data based on company name or email
    );
    setFilteredData(filtered);
  }, [searchItem, data]);

  //////////////
  // Function to render company ID in table cells
  const renderCompanyID = (company) => {
    return company._id ? company._id : <div>Loading...</div>;
  };

  //Function for Validating Email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //For re-rendering
  useEffect(() => {}, [refresh, data]);

  return (
    <>
      <AdminNavbar />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 64px - 128px)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 3,
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          {/* Add Company button */}
          <Button
            variant="outlined"
            color="secondary"
            sx={{  mb: 3 }}
            style={{ height: 55,marginRight:"20px" }}
            onClick={() => handleDialogOpen("add")}
          >
            <AddIcon/>
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            value={searchItem}
            onChange={handleSearchChange}
            sx={{ flex: 1, mb: 3}}
            style={{ height: 55 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TableContainer component={Paper}
        sx={{
          border:1,
          gap:2,
          borderColor:"primary.main",
      }}
      >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Company ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Company Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Contact Number</b>
                </TableCell>
                <TableCell align="center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{renderCompanyID(item)}</TableCell>
                  <TableCell align="center">{item.company_name}</TableCell>
                  <TableCell align="center">{item.company_email}</TableCell>
                  <TableCell align="center">{item.company_contact_number}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      size="small"
                      style={{ fontWeight: 'bold' }}
                      onClick={() => handleDialogOpen("edit", item)}
                    >
                      <EditIcon/>
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      style={{ fontWeight: 'bold' }}
                      onClick={() => handleConfirmDelete(item)}
                    >
                      <DeleteIcon/>
                    </Button>
                    <Button
                      size="small"
                      style={{ fontWeight: 'bold' }}
                      onClick={() => handleDialogOpen("info", item)}
                    >
                      <InfoOutlinedIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/*Edit, Add and Unfo Dialog Box */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogType === "add"
            ? "Add Company"
            : dialogType === "edit"
            ? "Edit Company"
            : dialogType === "info"
            ? "Company Information"
            : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="_id"
              name="_id"
              label="id"
              type="text"
              fullWidth
              variant="standard"
              value={formData._id}
              //   onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_name"
              name="company_name"
              label="Company Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.company_name}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_email"
              name="company_email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={formData.company_email}
              onChange={handleChange}
              error={!isValidEmail(formData.company_email)} // Check if the email is valid
              helperText={
                formData.company_email &&  !isValidEmail(formData.company_email)
                  ? "Invalid Email Format"
                  : ""
              } // Display error message if email is invalid
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_password"
              name="company_password"
              label="Password"
              type="text"
              fullWidth
              variant="standard"
              value={formData.company_password}
              onChange={handleChange}
              InputProps={
                dialogType === "info" || dialogType === "edit"
                  ? { readOnly: true }
                  : {}
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_logo"
              name="company_logo"
              label="Logo"
              type="text"
              fullWidth
              variant="standard"
              value={formData.company_logo}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_contact_number"
              name="company_contact_number"
              label="Contact Number"
              type="number"
              fullWidth
              variant="standard"
              value={formData.company_contact_number}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="company_address"
              name="company_address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={formData.company_address}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
          </DialogContentText>
        </DialogContent>

        {/*Alert for email*/}
        {dialogalert.open && (
          <Alert
            onClose={() => setAlert({ ...dialogalert, open: false })}
            severity="error"
            sx={{ zIndex: 9999 }}
          >
            {dialogalert.message}
          </Alert>
        )}

        <DialogActions>
          {dialogType === "add" || dialogType === "edit" ? (
            <Button onClick={handleDialogClose}>Cancel</Button>
          ) : null}
          <Button
            type="submit"
            onClick={handleAddOrUpdateCompany}
            color="primary"
          >
            {dialogType === "add"
              ? "Add"
              : dialogType === "edit"
              ? "edit"
              : dialogType === "info"
              ? "Done"
              : {}}
          </Button>
        </DialogActions>
      </Dialog>
      {/*Delete Dilog box */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete company "
            {deletedCompany && deletedCompany.company_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
          <Button
            onClick={() => handleDeleteCompany(deletedCompany._id)}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        {alert.open && (
          <Alert
            severity="success"
            onClose={() => setAlert({ open: false, message: "" })}
          >
            {alert.message}
          </Alert>
        )}
      </div>
    </>
  );
}

export default Dashboard;
