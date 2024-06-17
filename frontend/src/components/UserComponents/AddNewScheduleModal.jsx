// import { useState } from "react";
import PropTypes from 'prop-types'
import '../../styles/ScheduleGrid.css'

const AddNewScheduleModal = (handleClose) => {

  return (
    <div className="modal">
        <div className="modal-content">
        <span className="close"onClick={handleClose}>&times;</span>
        <h2>New Schedule</h2>
        </div>
    </div>
  )
}

AddNewScheduleModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    };

export default AddNewScheduleModal