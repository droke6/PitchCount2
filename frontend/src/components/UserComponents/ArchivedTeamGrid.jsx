import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, LAST_NAME } from "../../constants";
import { refreshAccessToken } from "../../utils/tokenUtils";
import PropTypes from 'prop-types';
import '../../styles/TeamGrid.css';

function ArchivedTeamGrid() {
    const [teamList, setTeamList] = useState([]);
    const navigate = useNavigate();
    const [lastName, setLastName] = useState("");

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
            const response = await fetch('http://localhost:8000/api/archived-teams/', {
                method: 'GET',
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

    const handleUnarchive = async (teamId) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        try {
            const response = await fetch(`http://localhost:8000/api/teams/${teamId}/unarchive-team/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Failed to unarchive team. Status: ${response.status}`);
            }
    
            setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
            fetchTeams(token);
        } catch (error) {
            console.error('Error un-archiving team:', error.message);
        }
    };

    const sortedTeamList = [...teamList].sort((a, b) => a.grade - b.grade);

    return (
        <div className="coach-teams-section">
            <div className={`coach-teams-grid ${sortedTeamList.length <= 1 ? 'one-column' : 'two-column'}`}>
                {sortedTeamList.length === 0 ? (
                    <div className="no-teams">
                        <p>You don't have any archived teams.</p>
                    </div>
                ) : (
                    sortedTeamList.map((team, index) => (
                        <div key={index} className="team-item">
                            <h3>{team.grade}B-{team.name}-{lastName}</h3>
                            <div className="team-options">
                                <a href="#">Past Seasons</a>
                                <a href="#">Roster</a>
                                <a href="#">Team Reports</a>
                                <button onClick={() => handleUnarchive(team.team_id)}>Unarchive</button>
                                <button onClick={() => handleDelete(team.team_id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
                {/* Additional empty grid item for odd number of teams */}
                {sortedTeamList.length % 2 === 1 && (
                    <div className="empty-team-item"></div>
                )}
            </div>
        </div>
    );
}

ArchivedTeamGrid.propTypes = {
    teams: PropTypes.array
};

export default ArchivedTeamGrid;
