// src/components/UserComponents/TeamRosterComponent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { refreshAccessToken } from '../../utils/tokenUtils'; // Import the utility
import '../../styles/TeamRoster.css';

const TeamRosterComponent = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([]);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hand, setHand] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeamDetails(token);
      fetchPlayers(token);
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
            navigate('/login');
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeamName(data.name);
    } catch (error) {
      console.error('Error fetching team details:', error.message);
    }
  };

  const fetchPlayers = async (token) => {
    try {
      const response = await fetch(`http://localhost:8000/api/teams/${teamId}/players/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchPlayers(newToken);
            return;
          } else {
            navigate('/login');
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error.message);
    }
  };

  const handleAddPlayer = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/teams/${teamId}/players/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          hand,
          number
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            await fetchPlayers(newToken);
            return;
          } else {
            navigate('/login');
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPlayers([...players, data]);
      setShowAddPlayer(false);
      setFirstName('');
      setLastName('');
      setHand('');
      setNumber('');
    } catch (error) {
      console.error('Error adding player:', error.message);
    }
  };

  return (
    <div className="team-roster-section">
      <h2>Team Roster: {teamName}</h2>
      {players.length === 0 ? (
        <div className="no-players">
          <p>No rosters for this team yet.</p>
        </div>
      ) : (
        <table className="roster-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Hand</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.hand}</td>
                <td>{player.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="add-player-btn" onClick={() => setShowAddPlayer(true)}>
        + Add Player
      </button>
      {showAddPlayer && (
        <div className="add-player-modal">
          <h3>Add Player</h3>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <select value={hand} onChange={(e) => setHand(e.target.value)}>
            <option value="">Select Hand</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="both">Both</option>
          </select>
          <input
            type="number"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button onClick={handleAddPlayer}>Save Player</button>
          <button onClick={() => setShowAddPlayer(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TeamRosterComponent;
