import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../../constants';
import '../../styles/AddTeamModal.css'

const AddTeamModal = ({ show, handleClose, handleSave }) => {
  const [teamName, setTeamName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [league, setLeague] = useState('');
  const [leaguesList, setLeaguesList] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
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
      } else {
        console.error('No token found');
      }
    };

    fetchLeagues();
  }, []);

  const handleSubmit = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Save new team to the backend
      fetch('http://localhost:8000/api/teams/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({ name: teamName, grade: gradeLevel, league }),
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
          setLeague('');
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
        <select
          className='input'
          value={league}
          onChange={(e) => setLeague(e.target.value)}
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
