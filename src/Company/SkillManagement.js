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
import axios from "axios";
import { useParams } from "react-router-dom";
import SkillData from "./SkillData";

function SkillManagement() {
  //All state for data, dialog open and close, for dilog type (add,edit and info)
  const [data, setData] = useState(SkillData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [formData, setFormData] = useState({
    _id: " ",
        skill_name: "",
        skill_description: "",
        subSkill: ""
  });
  const params = useParams();

  //State for delete and alert
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedSkill, setDeletedSkill] = useState(null);
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
        const rdata = await SkillData(params.companyID);
        let fdata = rdata.data;
        setData(fdata.response);
      } catch (err) {
        console.log("data not fetched", err);
      }
    };
    fetchData();
  }, [SkillData]);

  // Function to open dialog for add, edit or view Skill details
  const handleDialogOpen = (type, skillData) => {
    setDialogType(type);
    if (type === "edit" || type === "info") {
      setFormData(skillData);
    } else {
      setFormData({
        _id: " ",
            skill_name: "",
            skill_description: "",
            subSkill: ""
            // companyID: params.companyID, // Set companyID when adding a new skill
      });
    }
    setDialogOpen(true);
  };

  // Function to close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({
        _id: " ",
            skill_name: "",
            skill_description: "",
            subSkill: ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add or update skill details
const handleAddOrUpdateskill = async () => {
  
  //
  if (dialogType === "add") {
    const newSkill = { ...formData, companyID: params.companyID };
    try {
      let res = await axios.post(
        "http://localhost:5001/company/addSkills",
        newSkill,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("company_token")}`,
          },
        }
      );
      // Update state with the new Skill data
      setData([...data, newSkill]); // Assuming the response does not contain the updated data
    } catch (err) {
      console.log("err", err);
      // Handle error
    }
  } else {
    // Edit Logic
    const updatedSkill = { ...formData };
    try {
      let res = await axios.post(
        "http://localhost:5001/company/updateSkills",
        updatedSkill,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("company_token")}`,
          },
        }
      );
      // Update state with the updated Skill data
      const updatedData = data.map((item) =>
        item._id === updatedSkill._id ? updatedSkill : item
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


  // Function to confirm deletion of a skill
  const handleConfirmDelete = (skill) => {
    setDeletedSkill(skill);
    setDeleteDialogOpen(true);
  };

  // Function to delete a skill
  const handleDeleteskill = async (candi_data) => {
    try {
      let res = await axios.post(
        `http://localhost:5001/company/updateSkills`,
        {
          _id: candi_data,
          skill_isDeleted: true,
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

    const updatedskills = data.filter(
      (skill) => skill._id !== deletedSkill._id
    );
    setData(updatedskills);
    setDeleteDialogOpen(false);
    setAlert({
      open: true,
      message: `skill "${
        deletedSkill && deletedSkill.skill_name
      }" successfully deleted!`,
    });
    setDeletedSkill(null);
  };

  // Function to render Skill ID in table cells
const renderSkillID = (skill) => {
  return skill._id ? skill._id : <div>...Loading</div>
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
          {/* Add Skill button */}
          <Button
            variant="outlined"
            color="primary"
            sx={{ flex: 1, marginBottom: 3 }}
            style={{ height: 55 }}
            onClick={() => handleDialogOpen("add")}
          >
            Add Skill
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Skill ID</b>
                </TableCell>
                <TableCell>
                  <b>Skill Name</b>
                </TableCell>
                <TableCell>
                  <b>Sub Skill</b>
                </TableCell>
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{renderSkillID(item)}</TableCell>
                  <TableCell>{item.skill_name}</TableCell>
                  <TableCell>{item.subSkill}</TableCell>
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

      {/*Edit, Add and Info Dialog box*/}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogType === "add"
            ? "Add Skill"
            : dialogType === "edit"
            ? "Edit Skill"
            : dialogType === "info"
            ? "Skill Information"
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
              id="skill_name"
              name="skill_name"
              label="Skill Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.skill_name}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="skill_description"
              name="skill_description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={formData.skill_description}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="subSkill"
              name="subSkill"
              label="SubSkill"
              type="text"
              fullWidth
              variant="standard"
              value={formData.subSkill}
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
          sx={{zIndex: 9999 }}
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
            onClick={handleAddOrUpdateskill}
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
            Are you sure you want to delete Skill "
            {deletedSkill && deletedSkill.skill_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
          <Button
            onClick={() => handleDeleteskill(deletedSkill._id)}
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

export default SkillManagement;
