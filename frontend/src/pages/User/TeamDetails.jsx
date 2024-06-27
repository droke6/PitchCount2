import SideBar from '../../components/UserComponents/SideBar';
import Topbar from '../../components/UserComponents/Topbar';
import TeamDetailsComponent from '../../components/UserComponents/TeamDetailsComponent';
import '../../styles/Home.css';

function TeamDetails() {
  return (
    <div className="page-container">
      <SideBar />
      <div className="content">
        <Topbar />
        <TeamDetailsComponent />
      </div>
    </div>
  );
}

export default TeamDetails;