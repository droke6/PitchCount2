import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import GetStarted from './pages/User/GetStarted.jsx';
import Register from './pages/User/Register.jsx';
import Home from './pages/User/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import EnterPitchCount from './components/UserComponents/PitchCount.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import MyTeams from './pages/User/MyTeams.jsx';
import ManageTeams from './pages/Admin/ManageTeams.jsx';
import Reports from './pages/User/Reports.jsx';
import TeamReports from './pages/User/TeamReports.jsx'
import ArchivedPlayers from './pages/User/ArchivedPlayers.jsx';
import ArchivedTeams from './pages/User/ArchivedTeams.jsx';
import DeleteUser from './components/AdminComponents/DeleteUser.jsx';
import UserList from './components/AdminComponents/DeleteUser.jsx';
import TeamSchedule from './pages/User/TeamSchedule.jsx';
import TeamRoster from './pages/User/TeamRoster.jsx';
import TeamDetails from './pages/User/TeamDetails.jsx'

function Logout() {
  localStorage.clear();
  return <Navigate to='/sign-in' />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/pitch-count' element={<EnterPitchCount />} />
        <Route path='/team-schedule' element={<TeamSchedule />} />
        <Route path='/my-teams' element={<MyTeams />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/archived-players' element={<ArchivedPlayers />} />
        <Route path='/archived-teams' element={<ArchivedTeams />} />
        <Route path='/manage-teams' element={<ManageTeams />} />
        <Route path='/sign-in' element={<GetStarted />} />
        <Route path='/register' element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/team-roster/:teamId" element={<TeamRoster />} />
        <Route path='/team-details/:teamId' element={<TeamDetails />} />
        <Route path='/team-reports/:teamId' element={<TeamReports />} />
        <Route path='/team-schedule/:teamId' element={<TeamSchedule />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
