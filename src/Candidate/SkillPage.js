import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CompanyNavbar from "../Component/CompanyNavbar";
import CandidateSkillData from "./CandidateData";

const SkillPage = () => {
  const { skillId } = useParams();

  // Mock data - Replace this with your actual data retrieval logic
  const selectedSkill = CandidateSkillData.find((skill) => skill.Skill_id === parseInt(skillId));


  if (!selectedSkill) {
    return <Typography variant="h6">Skill not found!</Typography>;
  }

  const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name}>
      {nodes.sub && nodes.sub.map((subskill) => (
        <TreeItem key={subskill} nodeId={subskill} 
        label={
      <div>
        {subskill}
        <Button
          size="small"
          style={{ marginLeft: '8px' }}
        >
          <AddIcon />
        </Button>
      </div>
    }
        />
      ))}
    </TreeItem>
  );

  return (
    <>
      <CompanyNavbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '600px'
        }}>
          <Typography variant="h5" gutterBottom>
            Skill Details
          </Typography>
          <Typography variant="h6">{selectedSkill.Skill_name}</Typography>
          <Typography variant="body1" style={{ marginTop: 10 }}>
            {selectedSkill.Skill_Description}
          </Typography>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Skill Percentage: {selectedSkill.Skill_percentage}%
          </Typography>
          <Typography variant="h6" style={{ marginTop: 20 }}>
            Subskills
          </Typography>
          <TreeView
            aria-label="subskills-tree"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {selectedSkill.Sub_skills.map((subSkill) => renderTree(subSkill))}
          </TreeView>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
            Back to Skills
          </Button>
        </div>
      </div>
    </>
  );
};

export default SkillPage;
