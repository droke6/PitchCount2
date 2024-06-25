import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from "../../constants";
import '../../styles/TeamGrid.css'; // Import CSS file for modal styles

function DeleteTeamModal({ show, handleClose, handleDeleteTeam, teamId }) {
  const handleDeleteClick = () => {
    handleDeleteTeam(teamId); // Call handleDeleteTeam with teamId to delete from backend
    handleClose(); // Close modal after deletion
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Delete Team</h2>
        <p>Deleted teams cannot be recovered. Continue?</p>
        <div className="modal-buttons">
          <button className="add-button" onClick={handleDeleteClick}>Delete</button>
          <button className="add-button" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

DeleteTeamModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired, // Ensure teamId is passed and is a number
};

export default DeleteTeamModal;
