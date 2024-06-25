import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AddTeamModal from './AddNewTeamModal';
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
      // Fetch teams from the backend
      fetch('http://localhost:8000/api/teams/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
            });
          }
          return response.json();
        })
        .then(data => setTeamList(data))
        .catch(error => console.error('Error fetching teams:', error.message));
    } else {
      console.error('No token found');
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleSave = (newTeam) => {
    setTeamList([...teamList, newTeam]);
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
                <a href={`/team-schedule/${team.id}`}>Schedule</a>
                <a href={`/roster/${team.id}`}>Roster</a>
                <a href={`/pitch-count/${team.id}`}>Add Pitch Count</a>
                <a href={`/summary/${team.id}`}>Summary</a>
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
