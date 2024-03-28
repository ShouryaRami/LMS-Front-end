import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Testing() {
    const [skills, setSkills] = React.useState([]);
    const [val, setVal] = React.useState("");
    const [subText, setSubText] = React.useState("");
    const [lastId, setLastId] = React.useState(0);

    const handleAddSkill = () => {
        const newId = lastId + 1;
        const newSkill = {
            _id: newId.toString(),
            skill_name: val,
            skill_description: "",
            subSkill: []
        };
        setSkills([...skills, newSkill]);
        setVal("");
        setLastId(newId);
        console.log("Skills after adding skill:", skills);
    };

    const handleAddSubSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills[index].subSkill.push(subText);
        setSkills(updatedSkills);
        setSubText("");
        console.log("Skills after adding subskill:", skills);
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
        console.log("Skills after deleting skill:", skills);
    };

    const handleDeleteSubSkill = (parentIndex, subIndex) => {
        const updatedSkills = [...skills];
        updatedSkills[parentIndex].subSkill.splice(subIndex, 1);
        setSkills(updatedSkills);
        console.log("Skills after deleting subskill:", skills);
    };

    const handleUpdateSkillName = (index, newName) => {
        const updatedSkills = [...skills];
        updatedSkills[index].skill_name = newName;
        setSkills(updatedSkills);
        console.log("Skills after updating skill name:", skills);
    };

    const handleUpdateSubSkillName = (parentIndex, subIndex, newName) => {
        const updatedSkills = [...skills];
        updatedSkills[parentIndex].subSkill[subIndex] = newName;
        setSkills(updatedSkills);
        console.log("Skills after updating subskill name:", skills);
    };

    return (
        <div>
            <TextField
                label={"Skill Name"}
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
            />
            <Button onClick={handleAddSkill}>
                <AddIcon />
            </Button>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {skills.map((skill, index) => (
                    <TreeItem
                        key={skill._id}
                        nodeId={`skill-${skill._id}`}
                        label={skill.skill_name}
                    >
                        <div>
                            <TextField
                                label={"Sub Skill"}
                                value={subText}
                                onChange={(e) => {
                                    setSubText(e.target.value);
                                }}
                            />
                            <Button onClick={() => handleAddSubSkill(index)}>
                                <AddIcon />
                            </Button>
                        </div>
                        <Button onClick={() => handleDeleteSkill(index)}>Delete Skill</Button>
                        <Button onClick={() => {
                            const newName = prompt("Enter new skill name:");
                            if (newName !== null && newName !== "") {
                                handleUpdateSkillName(index, newName);
                            }
                        }}>Update Skill Name</Button>
                        {skill.subSkill.map((sub, subIndex) => (
                            <TreeItem
                                key={`sub-${subIndex}`}
                                nodeId={`sub-${subIndex}`}
                                label={sub}
                            >
                                <Button onClick={() => handleDeleteSubSkill(index, subIndex)}>
                                    Delete Sub Skill
                                </Button>
                                <Button onClick={() => {
                                    const newName = prompt("Enter new sub skill name:");
                                    if (newName !== null && newName !== "") {
                                        handleUpdateSubSkillName(index, subIndex, newName);
                                    }
                                }}>Update Sub Skill Name</Button>
                            </TreeItem>
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </div>
    );
}
