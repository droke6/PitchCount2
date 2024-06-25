import SideBar from "../../components/UserComponents/SideBar"
import Topbar from "../../components/UserComponents/Topbar"
import PitchReports from '../../components/UserComponents/PitchReports'
import '../../styles/Home.css'

function Reports() {
  return (
    <>
    <div className="page-container">
    <SideBar />
    <div className="content">
        <Topbar />
        Reports
        <PitchReports />
    </div>
    </div>
    </>
    
  )
}

export default Reports