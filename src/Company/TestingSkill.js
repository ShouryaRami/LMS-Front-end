import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Testing() {
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
    );
}
