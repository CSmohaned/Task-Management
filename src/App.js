import './App.css';
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Tasks from "./components/Tasks/Tasks";
import Projects from "./components/Projects/Projects";
import  Outlet from './components/Outlet/Outlet';
import NotFounded from './components/NotFounded/NotFounded';
import  Login from './components/Login/Login';
import  Register from './components/Register/Register';
import Home from './components/Home/Home';
import Unauthorized from './components/Unauthorized/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Users from './components/Users/Users';
import AddProject from './components/AddProject/AddProject';
import AddTask from './components/AddTask/AddTask';
import ProjectPage from './components/ProjectPage/ProjectPage';

const ROLES = {
  User: 'User',
  Admin: 'Admin',
  Manager: 'Manager'
}
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public route */}
        <Route path='login' element={<Login/>} />
        <Route path="unauthorized" element={<Unauthorized />} />
       < Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
       <Route path='register' element={<Register/>} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]}/>}>
      <Route path="addProject" element={ <AddProject/> } />
      <Route path="addTask" element={ <AddTask/> } />
      <Route path="users" element={ <Users/> } />
      </Route>
       <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Admin,ROLES.Manager]}/>}>
      <Route index path="/" element={<Home />} />
      <Route path="tasks" element={ <Tasks/> } />
      <Route path="profile" element={ <Profile/> } />
      <Route path="projects" element={ <Projects/> } />
      <Route path="project/:id" element={ <ProjectPage/> } />
      </Route>
        {/* catch all */}
      <Route path='*' element={<NotFounded/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
