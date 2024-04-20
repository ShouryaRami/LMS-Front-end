import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import Login from "./Admin/Login";
import Dashboard from "./Admin/AdminDashboard";
import Dashboard2 from "./Admin/Dashboard_test";
import Login2 from "./Admin/LoginOld";
import CompanyDashboard from "./Company/CompanyDashboard";
import LoginCompany from "./Company/LoginCompany";
import CompanyRegistration from "./Company/CompanyRegistration";
import AdminProfile from "./Admin/AdminProfile";
import EnterEmail from "./Company/EnterEmail";
import PasswordReset from "./Company/PasswordReset";
import Trial from "./Admin/EnhancedTable";
import StudentTable from "./Admin/Exampls";
import SkillManagement from "./Company/Skill/SkillManagement";
import TestingSkill from "./Company/Skill/TestingSkill";
import CandidateDashboard from "./Candidate/CandidateDashboard";
import SkillPage from "./Candidate/SkillPage";
import LoginCandidate from "./Candidate/LoginCadidate";
import PasswordReset_Candidate from "./Candidate/PasswordReset";
import EnterEmail_Candidate from "./Candidate/EnterEmail";


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            {/*Admin Pages*/}
            <Route path="/Admin/Login" element={<Login />} />
            <Route path="/Admin/Dashboard" element={<Dashboard />} />
            <Route path="/Admin/Profile" element={<AdminProfile />} />
            {/* <Route path='/Admin/Login2' element={<Login2/>}/> */}
            {/* <Route path='/' element={<StudentTable/>}/> */}
            <Route path='/Admin/Dashboard2' element={<Dashboard2/>}/>

            {/*Company Pages*/}
            <Route path="/Company/Login" element={<LoginCompany />} />
            <Route
              path="/Company/Dashboard/:companyID"
              element={<CompanyDashboard />}
            /> 
            {/* <Route
              path="/Company/Dashboard"
              element={<CompanyDashboard />}
            /> */}
            <Route
              path="/Company_Registration"
              element={<CompanyRegistration />}
            />
            <Route
              path="/Company/SkillManagement/:companyID"
              element={<SkillManagement/>}
            />
            <Route path="/Company/PasswordReset" element={<PasswordReset/>} />
            <Route path="/Company/PasswordReset/:company_email" element={<PasswordReset/>} />
            {/* <Route path="/Company/EnterEmail" element={<EnterEmail/>}/> */}

            {/*Candidate Pages*/}
            <Route path="/Candidate/Dashboard/:candidateID" element={<CandidateDashboard/>}/>
            <Route path="/Candidate/Skill/:skillId" element={<SkillPage/>}/>
            <Route path="/Candidate/Login" element={<LoginCandidate/>} />
            <Route path="/Candidate/PasswordReset" element={<PasswordReset_Candidate/>} />
            <Route path="/Candidate/EnterEmail" element={<EnterEmail_Candidate/>}/>

            {/*Testing */}
            <Route path="/EnhancedTable" element={<Trial/>}/>
            <Route path="/Testingskill" element={<TestingSkill/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
