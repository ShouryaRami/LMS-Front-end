import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CandidateData from "./CandidateData";
import CompanyNavbar from "../Component/CompanyNavbar";

const SkillPage = () => {
  const { skillId } = useParams(); // Retrieve the skillId parameter from the URL

  // Retrieve the selected skill's data from CandidateData based on skillId
  const selectedSkill = CandidateData.find((skill) => skill.Skill_id === parseInt(skillId));

  if (!selectedSkill) {
    return <Typography variant="h6">Skill not found!</Typography>;
  }

  // Extract the sub_skills data from the selected skill
  const { Sub_skills } = selectedSkill;

  // Function to recursively render tree nodes
  const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name}>
      {Array.isArray(nodes.sub) && nodes.sub.length > 0 ? (
        nodes.sub.map((subskill, index) => (
          <TreeItem key={`${nodes.name}-${index}`} nodeId={`${nodes.name}-${index}`} label={subskill} />
        ))
      ) : null}
    </TreeItem>
  );

  // Build the tree structure from the sub_skills data
  const treeData = Object.entries(Sub_skills).map(([nodeName, nodeData]) => ({
    name: nodeName,
    sub: nodeData.sub
  }));

  return (
    <>
      <CompanyNavbar />
      <div>
      <div style={{ padding: 20 }}>
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
          {treeData.map((node) => (
            <TreeItem key={node.name} nodeId={node.name} label={node.name}>
              {renderTree(node)}
            </TreeItem>
          ))}
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
