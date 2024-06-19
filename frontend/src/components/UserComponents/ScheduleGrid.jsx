import React, { useState } from 'react';
import '../../styles/ScheduleGrid.css';
import AddNewScheduleModal from './AddNewScheduleModal';

function ScheduleGrid() {
  const [showModal, setShowModal] = useState(false);
  const [games, setGames] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveGame = (newGame) => {
    const updatedGames = [...games, newGame]; // Add new game to the list of games
    setGames(updatedGames);
    setShowModal(false); // Close modal after saving
  };

  const handleEditGame = (editedGame) => {
    const updatedGames = games.map(game => (game.id === editedGame.id ? editedGame : game));
    setGames(updatedGames);
    setShowModal(false); // Close modal after editing
  };

  return (
    <div className="schedule-section">
      <div className="schedule-grid">
        <h2>Scheduled Games</h2>
        <div className="grid-container">
          {games.map((game, index) => (
            <div key={index} className="grid-item">
              <p><strong>Game {index + 1}</strong></p>
              {game.date ? (
                <p>{new Date(game.date).toLocaleDateString()}</p>
              ) : (
                <p>Date not specified</p>
              )}
              <p>{game.homeTeam} vs {game.awayTeam}</p>
              <button onClick={() => handleEditGame(game)}>Edit</button>
            </div>
          ))}
          {Array.from({ length: 8 - (games.length % 8) }).map((_, index) => (
            <div key={`empty-${index}`} className="grid-item empty"></div>
          ))}
        </div>
      </div>
      <div className="add-schedule">
        <button className="add-schedule-btn" onClick={() => setShowModal(true)}>
          + Add New Schedule
        </button>
      </div>
      <AddNewScheduleModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleSave={handleSaveGame} 
        games={games}
      />
    </div>
  );
}

export default ScheduleGrid;
