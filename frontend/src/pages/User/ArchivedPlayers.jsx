import Topbar from '../../components/UserComponents/Topbar'
import SideBar from '../../components/UserComponents/SideBar'
import '../../styles/Home.css'

function ArchivedPlayers() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="content">
          <Topbar />
          Archived Players
        </div>
      </div>
    </>
  )
}

export default ArchivedPlayers