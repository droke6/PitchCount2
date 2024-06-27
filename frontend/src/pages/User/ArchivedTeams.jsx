import Topbar from '../../components/UserComponents/Topbar'
import SideBar from '../../components/UserComponents/SideBar'
import ArchivedTeamsComponent from '../../components/UserComponents/ArchivedTeamsComponent'
import '../../styles/Home.css'

function ArchivedTeams() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="content">
          <Topbar />
          Archived Teams
          <ArchivedTeamsComponent />
        </div>
      </div>
    </>
  )
}

export default ArchivedTeams