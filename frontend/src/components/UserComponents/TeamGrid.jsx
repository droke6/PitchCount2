import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTeamModal from './AddNewTeamModal';
import '../../styles/TeamGrid.css';

function TeamGrid({ teams }) {
  const [showModal, setShowModal] = useState(false);
  const [teamList, setTeamList] = useState(teams);
  const [last_name, setLastName] = useState("");

  const handleAddTeam = (newTeamName, gradeLevel) => {
    const newTeam = { id: teamList.length + 1, name: newTeamName, grade: gradeLevel};
    setTeamList([...teamList, newTeam]);
    setShowModal(false);
  };

  useEffect(() => {
    const storedLastName = localStorage.getItem('last_name');
    if (storedLastName) {
        setLastName(storedLastName);
    }
  }, []);

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
              <h3>{team.grade}B-{team.name}-{last_name} </h3>
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
      <AddTeamModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleAddTeam} />
    </div>
  );
}

TeamGrid.propTypes = {
  teams: PropTypes.array.isRequired,
};

export default TeamGrid;
