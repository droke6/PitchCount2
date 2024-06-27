import SideBar from '../../components/UserComponents/SideBar';
import Topbar from '../../components/UserComponents/Topbar';
import TeamReportsComponent from '../../components/UserComponents/TeamReportsComponent';
import '../../styles/Home.css';

function TeamReports() {
  return (
    <div className="page-container">
        <SideBar />
        <div className="content">
            <Topbar />
            <TeamReportsComponent />
        </div>
    </div>
  )
}

export default TeamReports