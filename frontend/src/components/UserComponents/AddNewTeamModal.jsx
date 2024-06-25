import { useState } from 'react';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../../constants';

const AddTeamModal = ({ show, handleClose, handleSave }) => {
  const [teamName, setTeamName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  const handleSubmit = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Save new team to the backend
      fetch('http://localhost:8000/api/teams/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name: teamName, grade: gradeLevel })  // Ensure grade is included
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
            });
          }
          return response.json();
        })
        .then(data => {
          handleSave(data);
          setTeamName('');
          setGradeLevel('');
          handleClose();
        })
        .catch(error => console.error('Error adding team:', error.message));
    } else {
      console.error('No token found');
      handleClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>New Team</h2>
        <input
          className='input'
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />
        <select
          className='grade-level'
          name="grade"
          id="grade"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          placeholder="Grade Level"
        >
          <option disabled value="">Grade Level</option>
          <option value="KG">KG</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <button className='add-button' onClick={handleSubmit}>Save Team</button>
      </div>
    </div>
  );
};

AddTeamModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default AddTeamModal;
