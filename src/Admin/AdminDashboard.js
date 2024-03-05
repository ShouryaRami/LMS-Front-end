import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
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
} from "@mui/material";
import Data from "./Data";
import { data_main } from "./Data";
import axios from "axios";
import { Padding, RssFeed } from "@mui/icons-material";

function Dashboard() {
  // console.log(data2)
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
  // Function to add or update company details
const handleAddOrUpdateCompany = async () => {
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
      const updatedData = data.map(item => (item._id === updatedCompany._id ? updatedCompany : item));
      setData(updatedData);
    } catch (err) {
      console.log("err", err);
      // Handle error
    }
  }
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
        item.company_email.toLowerCase().includes(searchItem.toLowerCase()) // Filter data based on company name or email
    );
    setFilteredData(filtered);
  }, [searchItem, data]);


  //////////////
  // Function to render company ID in table cells
const renderCompanyID = (company) => {
  return company._id ? company._id : <div>Loading...</div>;
};

  return (
    <>
      <Navbar />
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
          <TextField
            label="Search"
            variant="outlined"
            value={searchItem}
            onChange={handleSearchChange}
            sx={{ flex: 1, marginBottom: 2.3, marginRight: 2 }}
            style={{ height: 60 }}
          />
          {/* Add Company button */}
          <Button
            variant="outlined"
            color="secondary"
            sx={{ flex: 1, marginBottom: 3 }}
            style={{ height: 55 }}
            onClick={() => handleDialogOpen("add")}
          >
            Add Company
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Company ID</b>
                </TableCell>
                <TableCell>
                  <b>Company Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Password</b>
                </TableCell>
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{renderCompanyID(item)}</TableCell>
                  <TableCell>{item.company_name}</TableCell>
                  <TableCell>{item.company_email}</TableCell>
                  <TableCell>{item.company_password}</TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      size="small"
                      onClick={() => handleDialogOpen("edit", item)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleConfirmDelete(item)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDialogOpen("info", item)}
                    >
                      Info
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
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
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
