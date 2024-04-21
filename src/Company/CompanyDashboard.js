import React, { useEffect, useState } from "react";
import CompanyNavbar from "../Component/CompanyNavbar";
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
import Data from "./CompanyData";
import { data_company_main } from "./CompanyData";
import axios from "axios";
import { useParams } from "react-router-dom";
import { skill_company_main } from "./CompanyData";

function CompanyDashboard() {
  //All state for data, dialog open and close, for dilog type (add,edit and info)
  const [data, setData] = useState(Data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    candidate_name: "",
    candidate_password: "",
    candidate_email: "",
    candidate_profilePic: "",
    candidate_contact_number: "",
    candidate_address: "",
  });
  const params = useParams();

  //State for delete and alert
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedCandidate, setDeletedCandidate] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });

  //State for Email dialog alert
  const [dialogalert, setDialogAlert] = useState({ open: false, message: "" });

  //State for refreshing page
  const [refresh, setRefresh] = useState("");

  //@ For fetching Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fetching real data from an API endpoint
        const rdata = await data_company_main(params.companyID);
        let fdata = rdata.data;
        setData(fdata.response);
      } catch (err) {
        console.log("data not fetched", err);
      }
    };
    fetchData();
  }, [data_company_main]);

  // Function to open dialog for add, edit or view candidate details
  const handleDialogOpen = (type, candidateData) => {
    setDialogType(type);
    if (type === "edit" || type === "info") {
      setFormData(candidateData);
    } else {
      setFormData({
        _id: "",
        candidate_name: "",
        candidate_password: "",
        candidate_email: "",
        candidate_profilePic: "",
        candidate_contact_number: "",
        candidate_address: "",
        companyID: params.companyID, // Set companyID when adding a new candidate
      });
    }
    setDialogOpen(true);
  };

  // Function to close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({
      _id: "",
      candidate_name: "",
      candidate_password: "",
      candidate_email: "",
      candidate_profilePic: "",
      candidate_contact_number: "",
      candidate_address: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add or update candidate details
  const handleAddOrUpdatecandidate = async () => {
    //To validate Email
    if (!isValidEmail(formData.candidate_email)) {
      console.log("Invalid email format");
      setDialogAlert({
        open: true,
        message: "Enter Valid Email"
      })
      return;
    }
    //!! // 
    if (dialogType === "add") {
      const newCandidate = { ...formData, companyID: params.companyID };
      try {
        let res = await axios.post(
          "http://localhost:5001/company/addCandidates",
          newCandidate,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("company_token")}`,
            },
          }
        );
        // Update state with the new candidate data
        setData([...data, newCandidate]); // Assuming the response does not contain the updated data
      } catch (err) {
        console.log("err", err);
        // Handle error
      }
    } else {
      // Edit Logic
      const updatedCandidate = { ...formData };
      try {
        let res = await axios.post(
          "http://localhost:5001/company/updateCandidates",
          updatedCandidate,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("company_token")}`,
            },
          }
        );
        // Update state with the updated candidate data
        const updatedData = data.map((item) =>
          item._id === updatedCandidate._id ? updatedCandidate : item
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


  // Function to confirm deletion of a candidate
  const handleConfirmDelete = (candidate) => {
    setDeletedCandidate(candidate);
    setDeleteDialogOpen(true);
  };

  // Function to delete a candidate
  const handleDeletecandidate = async (candi_data) => {
    try {
      let res = await axios.post(
        `http://localhost:5001/company/updateCandidates`,
        {
          _id: candi_data,
          candidate_isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("company_token")}`,
          },
        }
      );
    } catch (err) {
      console.log("err", err);
      // setAlert(true);
    }

    // Front end deletion

    const updatedcandidates = data.filter(
      (candidate) => candidate._id !== deletedCandidate._id
    );
    setData(updatedcandidates);
    setDeleteDialogOpen(false);
    setAlert({
      open: true,
      message: `candidate "${deletedCandidate && deletedCandidate.candidate_name
        }" successfully deleted!`,
    });
    setDeletedCandidate(null);
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
        item.candidate_name.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.candidate_email.toLowerCase().includes(searchItem.toLowerCase()) // Filter data based on company name or email
    );
    setFilteredData(filtered);
  }, [searchItem, data]);


  //////////////////////
  // Function to render candidate ID in table cells
  const renderCandidateID = (candidate) => {
    return candidate._id ? candidate._id : <div>...Loading</div>
  };

  //Function for Validating Email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //For re-rendering
  useEffect(() => { }, [refresh, data]);


  ///For Assign Skill 

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [skillData, setSkillData] = useState([]);

  // const handleAssignDialog = (sData) => {
  //   setAssignDialogOpen(true)
  //   const fetch = async () => {
  //     try {
  //       const mdata = await skill_company_main(params.companyID);
  //       let fetchdata = mdata.data
  //       setSkillData(fetchdata.response)
  //     } catch (err) {
  //       console.log("Skills not fetched", err)
  //     }
  //   };
  //   fetch();
  // };


  const handleAssignDialog = (sData) => {
    setAssignDialogOpen(true)
    axios.get(
        `http://localhost:5001/company/getAllSkills?company_id=${params.companyID}`
    )
    .then((res)=>{
      console.log(res)
      setSkillData(res.data.response)
      console.log(res.data.response)
    })
  }


  return (
    <>
      <CompanyNavbar />
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
            color="primary"
            sx={{ flex: 1, marginBottom: 3 }}
            style={{ height: 55 }}
            onClick={() => handleDialogOpen("add")}
          >
            Add Candidate
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Candidate ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Candidate Name</b>
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
                  <TableCell align="center">{renderCandidateID(item)}</TableCell>
                  <TableCell align="center">{item.candidate_name}</TableCell>
                  <TableCell align="center">{item.candidate_email}</TableCell>
                  <TableCell align="center">{item.candidate_contact_number}</TableCell>
                  <TableCell align="center">
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
                    <Button
                      size="small"
                      onClick={() => handleAssignDialog(item)}
                    >
                      Assign Skill
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/*Edit, Add and Info Dialog box*/}
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
              id="candidate_name"
              name="candidate_name"
              label="Candidate Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.candidate_name}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="candidate_email"
              name="candidate_email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={formData.candidate_email}
              onChange={handleChange}
              error={!isValidEmail(formData.candidate_email)} // Check if the email is valid
              helperText={
                formData.candidate_email && !isValidEmail(formData.candidate_email)
                  ? "Invalid Email Format"
                  : ""
              }// Display error message if email is invalid
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="candidate_password"
              name="candidate_password"
              label="Password"
              type="text"
              fullWidth
              variant="standard"
              value={formData.candidate_password}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="candidate_profilePic"
              name="candidate_profilePic"
              label="Logo"
              type="text"
              fullWidth
              variant="standard"
              value={formData.candidate_profilePic}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="candidate_contact_number"
              name="candidate_contact_number"
              label="Contact Number"
              type="text"
              fullWidth
              variant="standard"
              value={formData.candidate_contact_number}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="candidate_address"
              name="candidate_address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={formData.candidate_address}
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
            onClick={handleAddOrUpdatecandidate}
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
            Are you sure you want to delete Candidate "
            {deletedCandidate && deletedCandidate.candidate_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
          <Button
            onClick={() => handleDeletecandidate(deletedCandidate._id)}
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

      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
      >
        <DialogTitle>Assign Skills</DialogTitle>
        <DialogContent>
          Skills to assign
          {/* {skillData.map((item)=>(
            <>
            {item.Skill_name}
            </>
          ))} */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CompanyDashboard;
