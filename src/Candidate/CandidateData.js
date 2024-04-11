import axios from "axios";
const CandidateSkillData = [
     {
          Skill_id: 1,
          Skill_name: "Web Development",
          Skill_Description: "Front-end and back-end development using HTML, CSS, JavaScript, and Python",
          Sub_skills: [{qqqq: {
               sub: ['qq1']
             },
             sss: {
               sub: ['ssq']
             }}]
     },
     {
          Skill_id: 2,
          Skill_name: "Data Science",
          Skill_Description: "Analyzing and visualizing data using pandas, numpy, and matplotlib",
          Sub_skills: []
     },
     {
          Skill_id: 3,
          Skill_name: "Graphic Design",
          Skill_Description: "Creating visually appealing designs for websites and marketing materials",
          Sub_skills: []
     },
     {
          Skill_id: 4,
          Skill_name: "Mobile App Development",
          Skill_Description: "Building cross-platform mobile apps using React Native",
          Sub_skills: []
     },
     {
          Skill_id: 5,
          Skill_name: "Database Management",
          Skill_Description: "Designing and optimizing databases using SQL and MongoDB",
          Sub_skills: []
     },
     {
          Skill_id: 6,
          Skill_name: "Cloud Computing",
          Skill_Description: "Deploying applications on AWS and managing cloud resources",
          Sub_skills: []
     },
     {
          Skill_id: 7,
          Skill_name: "UI/UX Design",
          Skill_Description: "Creating user-friendly interfaces and wireframes",
          Sub_skills: []
     },
     {
          Skill_id: 8,
          Skill_name: "DevOps",
          Skill_Description: "Automating deployment pipelines and managing infrastructure",
          Sub_skills: []
     },
     {
          Skill_id: 9,
          Skill_name: "Cybersecurity",
          Skill_Description: "Securing applications and networks against threats",
          Sub_skills: []
     },
     {
          Skill_id: 10,
          Skill_name: "Project Management",
          Skill_Description: "Planning, executing, and monitoring software projects",
          Sub_skills: []
     }
]
     ;

export const skill_data_main = async (companyID) => {
  try {
    const respo = await axios.get(
      `http://localhost:5001/company/getAllSkills?company_id=${companyID}`
    );
    return respo;
    //   console.log('respo',respo.data)
  } catch (error) {
    console.log(error);
  }
};

export default CandidateSkillData;
