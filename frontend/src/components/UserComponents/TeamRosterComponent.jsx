// TeamRoster.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TeamRosterComponent() {
  const { teamId } = useParams(); // Fetching teamId from URL params
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/teams/${teamId}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTeamInfo(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching team info:', error.message);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTeamInfo();
  }, [teamId]);

  return (
    <div className="team-roster-info">
        <h2>Team Roster: {teamInfo.name}</h2>
        <p>Grade: {teamInfo.grade}</p>
        {/* Display other team information as needed */}
    </div>
  );
}

export default TeamRosterComponent;
