import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import Login from "./Admin/Login";
import Dashboard from "./Admin/AdminDashboard";
import DrawerMenu from "./Admin/Drawer";
import StudentTable from "./Admin/Exampls";
import Dashboard2 from "./Admin/Dashboard_test";
import Login2 from "./Admin/LoginOld";
import CompanyDashboard from "./Company/CompanyDashboard";
import LoginCompany from "./Company/LoginCompany";
import CompanyRegistration from "./Company/CompanyRegistration";
import AdminProfile from "./Admin/AdminProfile";
import PasswordReset from "./Company/PasswordReset";
import ErrorPage from "./Company/ErrorPage";

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
            {/* <Route path='/Admin/Dashboard2' element={<Dashboard2/>}/> */}

            {/*Company Pages*/}
            <Route path="/Login" element={<LoginCompany />} />
            <Route path="/errorpage" element={<ErrorPage />} />
            <Route
              path="/Company/Dashboard/:companyID"
              element={<CompanyDashboard />}
            />
            <Route
              path="/Company_Registration"
              element={<CompanyRegistration />}
            />
            <Route path="/ForgetPassword/:company_email" element={<PasswordReset />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
