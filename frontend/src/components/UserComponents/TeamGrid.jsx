import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AddTeamModal from './AddNewTeamModal';
// import DeleteTeamModal from './DeleteTeamModal';
import { ACCESS_TOKEN, LAST_NAME } from '../../constants';
import '../../styles/TeamGrid.css';

function TeamGrid() {
  const [showModal, setShowModal] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLastName = localStorage.getItem(LAST_NAME);
    if (storedLastName) {
      setLastName(storedLastName);
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetch('http://localhost:8000/api/teams/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setTeamList(data))
        .catch(error => console.error('Error fetching teams:', error.message));
    } else {
      console.error('No token found');
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = (newTeam) => {
    setTeamList([...teamList, newTeam]);
  };

  const handleDelete = (teamId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.error('No token found');
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/api/teams/${teamId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Filter out the deleted team from teamList
        setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
        // Reload team list after deletion
        fetch('http://localhost:8000/api/teams/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => setTeamList(data))
          .catch(error => console.error('Error fetching teams after deletion:', error.message));
      })
      .catch(error => console.error('Error deleting team:', error.message));
  };

  return (
    <div className="coach-teams-section">
      <div className="coach-teams-grid">
        {teamList.length === 0 ? (
          <div className="no-teams">
            <p>You have not added any teams to your account.</p>
          </div>
        ) : (
          teamList.map((team, index) => (
            <div key={index} className="team-item">
              <h3>{team.grade}B-{team.name}-{lastName}</h3>
              <div className="team-options">
                <a href={`/team-schedule/${team.team_id}`}>Schedule</a>
                <a href={`/team-roster/${team.team_id}`}>Roster</a>
                <a href={`/pitch-count/${team.team_id}`}>Add Pitch Count</a>
                <a href={`/summary/${team.team_id}`}>Team Reports</a>
                <div>
                  <button onClick={() => handleDelete(team.team_id)}>Delete</button>
                  <button title="Move to archive">Archive</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="add-team">
        <button className="add-team-btn" onClick={() => setShowModal(true)}>
          + Add New Team
        </button>
      </div>
      <AddTeamModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSave} />
    </div>

  );
}

TeamGrid.propTypes = {
  teams: PropTypes.array
};

export default TeamGrid;
