import TeamScheduleComponent from '../../components/UserComponents/TeamScheduleComponent'
import SideBar from '../../components/UserComponents/SideBar'
import Topbar from '../../components/UserComponents/Topbar'
import '../../styles/Home.css'

function TeamSchedule() {
  return (
    <div className="page-container">
      <SideBar />
      <div className="content">
        <Topbar />
        <TeamScheduleComponent />
      </div>
    </div>
  )
}

export default TeamSchedule