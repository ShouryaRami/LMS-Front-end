import axios from "axios";
const SkillData = [
    {
        _id: 1,
        course_name: "Web Development",
        skill_description: "Front-end and back-end development using HTML, CSS, JavaScript, and Python",
        skill: "React, Django"
    },
    {
        _id: 2,
        course_name: "Data Science",
        skill_description: "Analyzing and visualizing data using pandas, numpy, and matplotlib",
        skill: "Machine Learning, Data Cleaning"
    },
    {
        _id: 3,
        course_name: "Graphic Design",
        skill_description: "Creating visually appealing designs for websites and marketing materials",
        skill: "Adobe Photoshop, Illustrator"
    },
    {
        _id: 4,
        course_name: "Mobile App Development",
        skill_description: "Building cross-platform mobile apps using React Native",
        skill: "Redux, Expo"
    },
    {
        _id: 5,
        course_name: "Database Management",
        skill_description: "Designing and optimizing databases using SQL and MongoDB",
        skill: "Database Normalization, Indexing"
    },
    {
        _id: 6,
        course_name: "Cloud Computing",
        skill_description: "Deploying applications on AWS and managing cloud resources",
        skill: "EC2, S3, Lambda"
    },
    {
        _id: 7,
        course_name: "UI/UX Design",
        skill_description: "Creating user-friendly interfaces and wireframes",
        skill: "User Research, Prototyping"
    },
    {
        _id: 8,
        course_name: "DevOps",
        skill_description: "Automating deployment pipelines and managing infrastructure",
        skill: "Jenkins, Docker"
    },
    {
        _id: 9,
        course_name: "Cybersecurity",
        skill_description: "Securing applications and networks against threats",
        skill: "Firewalls, Encryption"
    },
    {
        _id: 10,
        course_name: "Project Management",
        skill_description: "Planning, executing, and monitoring software projects",
        skill: "Agile, Scrum"
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
