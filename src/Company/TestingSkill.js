import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function FileSystemNavigator() {
    const [skill, setSkill] = React.useState({});
    const [val, setVal] = React.useState("");
    const handleClick = () => {
        let obj = skill;
        obj[val] = {};
        setSkill(obj);
        setVal("");
    };

    const [subval, setSubVal] = React.useState("");
    const handleSubClick = (val) => {
        let obj = skill;
        obj[val][subval]={}
        setSkill(obj)
        setSubVal('')
    };
    return (
        <div>
            <TextField
                label={"Tasks"}
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
            ></TextField>
            <Button onClick={handleClick}>
                <AddIcon />
            </Button>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {Object.keys(skill).map((val, idx) => {
                    return (
                        <div>
                            {console.log("Skill -",skill)}
                            <TreeItem
                                aria-label="file system navigator"
                                nodeId={idx}
                                label={val}
                            >
                                <TextField
                                    label={"Sub Tasks"}
                                    value={subval}
                                    onChange={(x) => {
                                        setSubVal(x.target.value);
                                    }}
                                ></TextField>
                                <Button onClick={()=>handleSubClick(val)}>
                                    <AddIcon />
                                </Button>
                                
                                {Object.keys(skill[val]).length>=0 && Object.keys(skill[val]).map((subval, subidx) => {
                                    return (
                                        <div>
                                            <TreeItem label={val[subval]} nodeId={subidx} />
                                            {console.log("skill - ",skill)}
                                        </div>
                                    );
                                })}
                                {/* <TreeItem label="subval"/> */}
                            </TreeItem>
                        </div>
                    );
                })}
            </TreeView>
        </div>
    );
}
