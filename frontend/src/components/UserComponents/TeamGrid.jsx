import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, LAST_NAME } from '../../constants';
import '../../styles/TeamGrid.css';
import { refreshAccessToken } from '../../utils/tokenUtils';  // Import the utility

function TeamGrid() {
  const [teamList, setTeamList] = useState([]);
  const [lastName, setLastName] = useState("");
  const [newTeamName, setNewTeamName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState('');
  const [newLeague, setNewLeague] = useState('');
  const [leaguesList, setLeaguesList] = useState([]);
  const [showNewTeamGrid, setShowNewTeamGrid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLastName = localStorage.getItem(LAST_NAME);
    if (storedLastName) {
      setLastName(storedLastName);
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeams(token);
      fetchLeagues(token);
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

  const fetchLeagues = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/leagues/', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch leagues');
      }
      const data = await response.json();
      setLeaguesList(data); // Assuming data is an array of league objects [{ league_id, league_name }]
    } catch (error) {
      console.error('Error fetching leagues:', error.message);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/api/teams/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name: newTeamName, grade: newGradeLevel, league: newLeague })
        });

        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
          });
        }

        const data = await response.json();
        setTeamList([...teamList, data]);
        setNewTeamName('');
        setNewGradeLevel('');
        setNewLeague('');
        setShowNewTeamGrid(false); // Hide the new team grid after saving
      } catch (error) {
        console.error('Error adding team:', error.message);
      }
    } else {
      console.error('No token found');
    }
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

  const handleCancel = () => {
    setShowNewTeamGrid(false);
    // Optionally, you may want to reset any form input values here
    setNewTeamName('');
    setNewGradeLevel('');
    setNewLeague('');
  };

  return (
    <div className="coach-teams-section">
      <div className={`coach-teams-grid ${sortedTeamList.length <= 1 ? 'one-column' : 'two-column'}`}>
        {sortedTeamList.length === 0 && !showNewTeamGrid ? (
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
        {showNewTeamGrid && (
          <div className="team-item new-team-item">
            <input
              className='input'
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Team Name"
            />
            <div className="opt">
              <div>
                <select
                  className='grade-level'
                  name="grade"
                  id="grade"
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  placeholder="Grade Level"
                >
                  <option disabled value="">Grade Level</option>
                  {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className='input'
                  value={newLeague}
                  onChange={(e) => setNewLeague(e.target.value)}
                  placeholder='League'
                >
                  <option disabled value="">Select League</option>
                  {leaguesList
                    .slice() // Create a shallow copy of the array
                    .sort((a, b) => a.league.localeCompare(b.league)) // Sort alphabetically by league name
                    .map(league => (
                      <option key={league.league_id} value={league.league}>
                        {league.league}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <button className='add-team-btn' onClick={handleSave}>Save Team</button>
              <button className='add-team-btn' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="add-team">
        <button className="add-team-btn" onClick={() => setShowNewTeamGrid(true)}>
          + Add New Team
        </button>
      </div>
    </div>
  );
}

TeamGrid.propTypes = {
  teams: PropTypes.array
};

export default TeamGrid;
