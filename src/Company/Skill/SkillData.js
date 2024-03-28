import axios from "axios";
const SkillData = [
    {
        _id: "1",
        skill_name: "Web Development",
        skill_description: "Front-end and back-end development using HTML, CSS, JavaScript, and Python",
        subSkill: "React, Django"
    },
    {
        _id: "2",
        skill_name: "Data Science",
        skill_description: "Analyzing and visualizing data using pandas, numpy, and matplotlib",
        subSkill: "Machine Learning, Data Cleaning"
    },
    {
        _id: "3",
        skill_name: "Graphic Design",
        skill_description: "Creating visually appealing designs for websites and marketing materials",
        subSkill: "Adobe Photoshop, Illustrator"
    },
    {
        _id: "4",
        skill_name: "Mobile App Development",
        skill_description: "Building cross-platform mobile apps using React Native",
        subSkill: "Redux, Expo"
    },
    {
        _id: "5",
        skill_name: "Database Management",
        skill_description: "Designing and optimizing databases using SQL and MongoDB",
        subSkill: "Database Normalization, Indexing"
    },
    {
        _id: "6",
        skill_name: "Cloud Computing",
        skill_description: "Deploying applications on AWS and managing cloud resources",
        subSkill: "EC2, S3, Lambda"
    },
    {
        _id: "7",
        skill_name: "UI/UX Design",
        skill_description: "Creating user-friendly interfaces and wireframes",
        subSkill: "User Research, Prototyping"
    },
    {
        _id: "8",
        skill_name: "DevOps",
        skill_description: "Automating deployment pipelines and managing infrastructure",
        subSkill: "Jenkins, Docker"
    },
    {
        _id: "9",
        skill_name: "Cybersecurity",
        skill_description: "Securing applications and networks against threats",
        subSkill: "Firewalls, Encryption"
    },
    {
        _id: "10",
        skill_name: "Project Management",
        skill_description: "Planning, executing, and monitoring software projects",
        subSkill: "Agile, Scrum"
    }
]
;

// export const data_company_main = async (companyID) => {
//   try {
//     const respo = await axios.get(
//       `http://localhost:5001/company/getAllSkills?company_id=${companyID}`
//     );
//     return respo;
//     //   console.log('respo',respo.data)
//   } catch (error) {
//     console.log(error);
//   }
// };

export default SkillData;
