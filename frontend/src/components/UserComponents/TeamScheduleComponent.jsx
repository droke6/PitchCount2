import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { refreshAccessToken } from '../../utils/tokenUtils';
import '../../styles/TeamScheduleComponent.css'

function TeamScheduleComponent() {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [league, setLeague] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeamDetails(token);
    } else {
      navigate('/sign-in');
    }
  }, [teamId, navigate]);

  const fetchTeamDetails = async (token) => {
    try {
      const response = await fetch(`http://localhost:8000/api/teams/${teamId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchTeamDetails(newToken);
            return;
          } else {
            navigate('/sign-in');
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeamName(data.name);
      setLeague(data.league)
      setGrade(data.grade)
    } catch (error) {
      console.error('Error fetching team details:', error.message);
    }
  };

  return (
    <div>
      <div className="title">
        <h2>Team Schedule: {grade}B - {teamName}</h2>
        <h3>League: {league}</h3>
      </div>
    </div>
  );
}

export default TeamScheduleComponent;
