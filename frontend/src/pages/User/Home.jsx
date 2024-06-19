// import Navbar from '../../components/UserComponents/Navbar';
import Topbar from '../../components/UserComponents/Topbar';
import SideBar from "../../components/UserComponents/SideBar";
import '../../styles/Home.css';
import '../../styles/buttons.css'
import TeamGrid from "../../components/UserComponents/TeamGrid";
// import { useNavigate } from 'react-router-dom';

function Home() {
  // const navigate = useNavigate();

  const teams = [];
  const grade_level = [];

  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="content">
          <Topbar />
          <div className="team-grid-container">
            <h2>My Teams</h2>
            <TeamGrid teams={teams} grade_level={grade_level} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
