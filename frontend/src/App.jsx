import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './pages/User/Login.jsx';
import Register from './pages/User/Register.jsx';
import Home from './pages/User/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import EnterPitchCount from './components/UserComponents/PitchCount.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import MyTeams from './pages/User/MyTeams.jsx';
import ManageTeams from './pages/Admin/ManageTeams.jsx';
import DeleteUser from './components/AdminComponents/DeleteUser.jsx';
import UserList from './components/AdminComponents/DeleteUser.jsx'
import TeamSchedule from './pages/User/TeamSchedule.jsx'
// import ProtectedRoutes from './components/ProtectedRoutes.jsx';


function Logout() {
  localStorage.clear();
  return <Navigate to='/sign-in' />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/pitch-count' element={<EnterPitchCount />} />
          <Route path='/team-schedule' element={<TeamSchedule />} />
          <Route path='/my-teams' element={<MyTeams />} />
          <Route path='/manage-teams' element={<ManageTeams />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
