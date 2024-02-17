import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Admin/Login';
import Dashboard from './Admin/AdminDashboard';
import Edit from './Admin/Edit';
import Add from './Admin/Add';
import DrawerMenu from './Admin/Drawer';
import StudentTable from './Admin/Exampls';
import Dashboard2 from './Admin/Dashboard_test';
import Login2 from './Admin/LoginOld';
import CompanyDashboard from './Company/CompanyDashboard';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/Admin/Login' element={<Login/>}/>
            {/* <Route path='/Admin/Login2' element={<Login2/>}/> */}
            <Route path='/Admin/Dashboard' element={<Dashboard/>}/>
            {/* <Route path='/Admin/Edit' element={<Edit/>}/>
            <Route path='/Admin/Add' element={<Add/>}/> */}
            {/* <Route path='/' element={<StudentTable/>}/> */}
            {/* <Route path='/Admin/Dashboard2' element={<Dashboard2/>}/> */}

            <Route path='/Company/Dashboard' element={<CompanyDashboard/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
