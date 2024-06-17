import { useState } from 'react'
import '../../styles/ScheduleGrid.css'
import AddNewScheduleModal from './AddNewScheduleModal'

function ScheduleGrid() {
    const [showModal, setShowModal] = useState(false)
  return (

    <div className="schedule-section">
        <div className="schedule-grid">

        </div>
        <div className="add-schedule">
        <button className="add-schedule-btn" onClick={() => setShowModal(true)}>
          + Add New Team
        </button>
        </div>
        <AddNewScheduleModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  )
}

export default ScheduleGrid