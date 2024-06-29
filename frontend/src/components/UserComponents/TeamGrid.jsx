import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AddTeamModal from './AddNewTeamModal';
import { ACCESS_TOKEN, LAST_NAME} from '../../constants';
import '../../styles/TeamGrid.css';
import { refreshAccessToken } from '../../utils/tokenUtils';  // Import the utility

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
      fetchTeams(token);
    } else {
      navigate('/sign-in');
    }
  }, [navigate]);

  const fetchTeams = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/teams/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchTeams(newToken);
            return;
          } else {
            navigate('/sign-in');
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeamList(data);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  const handleSave = (newTeam) => {
    setTeamList([...teamList, newTeam]);
  };

  const handleDelete = async (teamId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate('/sign-in');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/api/teams/${teamId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error.message);
    }
  };
  

  const handleArchive = async (teamId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate('/sign-in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/archive-team/${teamId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
      fetchTeams(token);
    } catch (error) {
      console.error('Error archiving team:', error.message);
    }
  };

  // Sort the teamList by grade level in ascending order
  const sortedTeamList = [...teamList].sort((a, b) => a.grade - b.grade);

  return (
    <div className="coach-teams-section">
      <div className={`coach-teams-grid ${sortedTeamList.length <= 1 ? 'one-column' : 'two-column'}`}>
        {sortedTeamList.length === 0 ? (
          <div className="no-teams">
            <p>You have not added any teams to your account.</p>
          </div>
        ) : (
          sortedTeamList.map((team, index) => (
            <div key={index} className="team-item">
              <span className='team-title' onClick={() => navigate(`/team-details/${team.team_id}/`)}>
                <h3>{team.grade}B-{team.name}-{lastName}</h3>
              </span>
              <h4>{team.league}</h4>
              <div className="team-options">
                <a href={`/team-schedule/${team.team_id}`}>Schedule</a>
                <a href={`/team-roster/${team.team_id}`}>Roster</a>
                <a href={`/pitch-count/${team.team_id}`}>Add Pitch Count</a>
                <a href={`/team-reports/${team.team_id}`}>Team Reports</a>
                <div>
                  <button title="Move to archive" onClick={() => handleArchive(team.team_id)}>Archive</button>
                  <button onClick={() => handleDelete(team.team_id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
        {/* Additional empty grid item for odd number of teams */}
        {sortedTeamList.length % 2 === 1 && (
          <div className="empty-team-item"></div>
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
