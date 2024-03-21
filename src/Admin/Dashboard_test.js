import React, { useState, useEffect } from "react";
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
  TableSortLabel,
  Box,
  TablePagination,
} from "@mui/material";
import Data from "./Data";
import { data_main } from "./Data";
import axios from "axios";
//For Enhanced Table
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import AdminNavbar from "../Component/AdminNavbar";


function Dashboard2() {
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
        item.company_email.toLowerCase().includes(searchItem.toLowerCase()) // Filter data based on company name or email
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
  useEffect(() => {}, [data,refresh]);

  ////////////For New Table with sorting and pagination
  let final_data=filteredData
    //For Sorting
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    
    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    //For table head
    const headCells = [
      {
        id: 'id',
        label: 'Company ID',
      },
      {
        id: 'company_name',
        label: 'Company Name',
      },
      {
        id: 'company_email',
        label: 'Email',
      },
      {
        id: 'company_contact_number',
        label: 'Contact Number',
      },
      {
        id: 'action',
        label: 'Action',
      },
    ];


    //For enhanced table
    function EnhancedTableHead(props) {
      const { order, orderBy, onRequestSort } = props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    
      return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align='center'
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.id !== 'action' && headCell.id !== 'company_contact_number' ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  <span>{headCell.label}</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
      onRequestSort: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
    };

    //State for Enhanced Pages
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //All logic for pagination and sorting
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - final_data.length) : 0;
  
    const visibleRows = React.useMemo(
      () =>
        stableSort(final_data, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage],
    );

  return (
    <>
      <AdminNavbar />
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "secondary" ,
          minHeight: "calc(100vh - 64px - 128px)",
          display: "flex",
          flexDirection: "column",
          mt: 3,
          mb: 4,
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
            sx={{ flex: 1, mb: 2.3, mr: 2 }}
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
        <TableContainer component={Paper}
        sx={{
            border:1,
            gap:2,
            borderColor:"primary.main",
            backgroundColor: "#90caf9"
        }}
        >
          <Table aria-label="simple table">
          <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((final_data, index) => (
                <TableRow
                  hover
                  key={final_data.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell align="center">{final_data.id}</TableCell>
                  <TableCell component="th" align='center' scope="row">
                    {final_data.company_name}
                  </TableCell>
                  <TableCell align="center">{final_data.company_email}</TableCell>
                  <TableCell align="center">{final_data.company_contact_number}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      size="small"
                      onClick={() => handleDialogOpen("edit", final_data)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleConfirmDelete(final_data)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDialogOpen("info", final_data)}
                    >
                      Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={final_data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

export default Dashboard2;
