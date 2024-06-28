import Topbar from '../../components/UserComponents/Topbar'
import SideBar from '../../components/UserComponents/SideBar'
import ArchivedTeamGrid from '../../components/UserComponents/ArchivedTeamGrid'
import '../../styles/Home.css'

function ArchivedTeams() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="content">
          <Topbar />
          <h1 style={{'textAlign': 'center', 'marginBottom': -30}}>Archived Teams</h1>
          <ArchivedTeamGrid />
        </div>
      </div>
    </>
  )
}

export default ArchivedTeams