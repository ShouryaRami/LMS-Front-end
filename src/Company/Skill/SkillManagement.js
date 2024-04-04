import React, { useEffect, useState } from "react";
import CompanyNavbar from "../../Component/CompanyNavbar";
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

import AddIcon from "@mui/icons-material/Add";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


function SkillManagement() {
  //All state for data, dialog open and close, for dilog type (add,edit and info)
  const [data, setData] = useState(SkillData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [formData, setFormData] = useState({
        compnay_id: "",
        Skill_name: [],
        Skill_description: "",
        Sub_skill: ""
  });
  const params = useParams();

  //State for delete and alert
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedSkill, setDeletedSkill] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });

  
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
        compnay_id: "",
        Skill_name: [],
        Skill_description: "",
        Sub_skill: ""
            // companyID: params.companyID, // Set companyID when adding a new skill
      });
    }
    setDialogOpen(true);
  };

  // Function to close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({
      compnay_id: "",
      Skill_name: [],
      Skill_description: "",
      Sub_skill: ""
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
        item.compnay_id === updatedSkill.compnay_id ? updatedSkill : item
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
          compnay_id: candi_data,
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
      (skill) => skill.compnay_id !== deletedSkill.compnay_id
    );
    setData(updatedskills);
    setDeleteDialogOpen(false);
    setAlert({
      open: true,
      message: `skill "${
        deletedSkill && deletedSkill.Skill_name
      }" successfully deleted!`,
    });
    setDeletedSkill(null);
  };

  // Function to render Skill ID in table cells
const renderSkillID = (skill) => {
  return skill.compnay_id ? skill.compnay_id : <div>...Loading</div>
};

  //Function for Validating Email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //For re-rendering
  useEffect(() => {}, [refresh, data]);


  //All logic for skills

  const [skill, setSkill] = React.useState({});
  const [val, setVal] = React.useState("");
  const [subText, setSubText] = React.useState("");
  const [texts, setTexts] = React.useState([]);

  const handleClick = () => {
      let obj = skill;
      obj[val] = { sub: [] };
      setSkill(obj);
      setVal("");
  };

  const handleAddSubText = (parent) => {
      const updatedSkill = { ...skill };
      if (!updatedSkill[parent].sub) {
          updatedSkill[parent].sub = [];
      }
      updatedSkill[parent].sub.push(subText);
      setSkill(updatedSkill);
      setSubText("");
  };

  const handleUpdateParentText = (oldParent, newParent) => {
      const updatedSkill = { ...skill };
      updatedSkill[newParent] = updatedSkill[oldParent];
      delete updatedSkill[oldParent];
      setSkill(updatedSkill);
  };

  const handleUpdateSubText = (parent, oldSub, newSub) => {
      const updatedSkill = { ...skill };
      const index = updatedSkill[parent].sub.indexOf(oldSub);
      if (index !== -1) {
          updatedSkill[parent].sub[index] = newSub;
          setSkill(updatedSkill);
      }
  };

  const handleDeleteParentText = (parent) => {
      const updatedSkill = { ...skill };
      delete updatedSkill[parent];
      setSkill(updatedSkill);
  };

  const handleDeleteSubText = (parent, sub) => {
      const updatedSkill = { ...skill };
      const index = updatedSkill[parent].sub.indexOf(sub);
      if (index !== -1) {
          updatedSkill[parent].sub.splice(index, 1);
          setSkill(updatedSkill);
      }
  };

  return (
    <>
      <CompanyNavbar/>
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
            Add Course
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
                <TableRow key={item.compnay_id}>
                  <TableCell>{renderSkillID(item)}</TableCell>
                  <TableCell>{item.Skill_name}</TableCell>
                  <TableCell>{item.Sub_skill}</TableCell>
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
              id="compnay_id"
              name="compnay_id"
              label="id"
              type="text"
              fullWidth
              variant="standard"
              value={formData.compnay_id}
              //   onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Skill_name"
              name="Skill_name"
              label="Skill Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.Skill_name}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Skill_description"
              name="Skill_description"
              label="Skill Description"
              type="text"
              fullWidth
              variant="standard"
              value={formData.Skill_description}
              onChange={handleChange}
              InputProps={dialogType === "info" ? { readOnly: true } : {}}
            />
          <div>
            <TextField
                label={"Tasks"}
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
            />
            <Button onClick={handleClick}>
                <AddIcon />
            </Button>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {Object.keys(skill).map((parent, idx) => {
                    return (
                        <TreeItem
                            key={parent}
                            nodeId={`parent-${idx}`}
                            label={parent}
                        >
                            <div>
                                <TextField
                                    label={"Sub Tasks"}
                                    value={subText}
                                    onChange={(e) => {
                                        setSubText(e.target.value);
                                    }}
                                />
                                <Button onClick={() => handleAddSubText(parent)}>
                                    <AddIcon />
                                </Button>
                            </div>
                            <Button onClick={() => handleDeleteParentText(parent)}>Delete Parent</Button>
                            <Button onClick={() => {
                                const newParent = prompt("Enter new parent text:");
                                if (newParent !== null && newParent !== "") {
                                    handleUpdateParentText(parent, newParent);
                                }
                            }}>Update Parent</Button>
                            {skill[parent].sub &&
                                skill[parent].sub.map((sub, subIdx) => (
                                    <TreeItem
                                        key={`${parent}-sub-${subIdx}`}
                                        nodeId={`${parent}-sub-${subIdx}`}
                                        label={sub}
                                    >
                                        <Button onClick={() => handleDeleteSubText(parent, sub)}>Delete Sub</Button>
                                        <Button onClick={() => {
                                            const newSub = prompt("Enter new subtext:");
                                            if (newSub !== null && newSub !== "") {
                                                handleUpdateSubText(parent, sub, newSub);
                                            }
                                        }}>Update Sub</Button>
                                    </TreeItem>
                                ))}
                        </TreeItem>
                    );
                })}
            </TreeView>
        </div>
          </DialogContentText>
        </DialogContent>
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
            {deletedSkill && deletedSkill.Skill_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
          <Button
            onClick={() => handleDeleteskill(deletedSkill.compnay_id)}
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
