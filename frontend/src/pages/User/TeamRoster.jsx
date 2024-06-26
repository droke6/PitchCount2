import SideBar from '../../components/UserComponents/SideBar';
import Topbar from '../../components/UserComponents/Topbar';
import TeamRosterComponent from '../../components/UserComponents/TeamRosterComponent';
import '../../styles/Home.css'

function TeamRoster() {
  return (
    <div className="page-container">
      <SideBar />
      <div className="content">
        <Topbar />
        <TeamRosterComponent />
      </div>
    </div>
  );
}

export default TeamRoster;
