// import React, { useState } from 'react';
// import { FormControl, InputLabel, Select, MenuItem, Chip, makeStyles } from '@mui/material';
// import { TreeView } from '@mui/x-tree-view';



// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
// }));

// const skillsData = [
//   {
//     id: 1,
//     name: 'Programming',
//     children: [
//       { id: 11, name: 'JavaScript' },
//       { id: 12, name: 'Python' },
//       { id: 13, name: 'Java' },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Design',
//     children: [
//       { id: 21, name: 'UI Design' },
//       { id: 22, name: 'UX Design' },
//     ],
//   },
// ];

// const Testing = () => {
//   const classes = useStyles();
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const handleSkillChange = (event) => {
//     setSelectedSkills(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="skill-select-label">Select Skills</InputLabel>
//         <Select
//           labelId="skill-select-label"
//           id="skill-select"
//           multiple
//           value={selectedSkills}
//           onChange={handleSkillChange}
//           renderValue={(selected) => (
//             <div className={classes.chips}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} className={classes.chip} />
//               ))}
//             </div>
//           )}
//         >
//           {skillsData.map((skill) => (
//             <MenuItem key={skill.id} value={skill.name}>
//               {skill.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {selectedSkills.length > 0 && (
//         <TreeView>
//           {selectedSkills.map((selectedSkill) => (
//             <TreeItem key={selectedSkill} nodeId={selectedSkill} label={selectedSkill}>
//               {skillsData
//                 .find((skill) => skill.name === selectedSkill)
//                 .children.map((subSkill) => (
//                   <TreeItem key={subSkill.id} nodeId={subSkill.id.toString()} label={subSkill.name} />
//                 ))}
//             </TreeItem>
//           ))}
//         </TreeView>
//       )}
//     </div>
//   );
// };

// export default Testing;
