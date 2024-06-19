import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/ScheduleGrid.css';

const AddNewScheduleModal = ({ show, handleClose, handleSave, games }) => {
  const [gameList, setGameList] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    id: null,
    date: null,
    homeTeam: '',
    awayTeam: '',
  });

  useEffect(() => {
    setGameList(games.map((game, index) => ({ ...game, label: `Game ${index + 1}` })));
  }, [games]);

  const handleAddGame = () => {
    if (currentGame.id === null) {
      // New game
      const newGame = {
        id: gameList.length + 1,
        date: currentGame.date ? currentGame.date : null,
        homeTeam: currentGame.homeTeam,
        awayTeam: currentGame.awayTeam,
        label: `Game ${gameList.length + 1}`,
      };
      setGameList([...gameList, newGame]);
    } else {
      // Edit existing game
      const updatedGames = gameList.map(game =>
        game.id === currentGame.id ? { ...game, date: currentGame.date, homeTeam: currentGame.homeTeam, awayTeam: currentGame.awayTeam } : game
      );
      setGameList(updatedGames);
    }
    setCurrentGame({
      id: null,
      date: null,
      homeTeam: '',
      awayTeam: '',
    });
  };

  const handleEditGame = (game) => {
    setCurrentGame({
      id: game.id,
      date: game.date,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
    });
  };

  const handleSaveGames = () => {
    handleSave(gameList);
    handleClose();
  };

  const handleDateChange = (date) => {
    setCurrentGame({
      ...currentGame,
      date,
    });
  };

  const handleHomeTeamChange = (e) => {
    setCurrentGame({
      ...currentGame,
      homeTeam: e.target.value,
    });
  };

  const handleAwayTeamChange = (e) => {
    setCurrentGame({
      ...currentGame,
      awayTeam: e.target.value,
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{currentGame.id ? `Edit ${currentGame.label}` : 'New Schedule'}</h2>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker selected={currentGame.date} onChange={handleDateChange} dateFormat="MM/dd/yyyy" />
        </div>
        <div className="form-group">
          <label>Home Team:</label>
          <select value={currentGame.homeTeam} onChange={handleHomeTeamChange}>
            <option>Select Home Team</option>
            <option>My Team</option>
            {/* Add other teams as options if needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Away Team:</label>
          <select value={currentGame.awayTeam} onChange={handleAwayTeamChange}>
            <option>Select Away Team</option>
            <option>My Team</option>
            {/* Add other teams as options if needed */}
          </select>
        </div>
        <button className="add-game-btn" onClick={handleAddGame}>
          {currentGame.id ? 'Save Changes' : 'Add Game'}
        </button>
        {gameList.length > 0 && (
          <div className="saved-games">
            <h3>Saved Games</h3>
            {gameList.map((game) => (
              <div key={game.id}>
                <p>{game.label}</p>
                {game.date ? (
                  <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                ) : (
                  <p>Date not specified</p>
                )}
                <p>Home Team: {game.homeTeam}</p>
                <p>Away Team: {game.awayTeam}</p>
                <button onClick={() => handleEditGame(game)}>Edit</button>
              </div>
            ))}
          </div>
        )}
        <button className="save-games-btn" onClick={handleSaveGames}>
          Save Games
        </button>
      </div>
    </div>
  );
};

AddNewScheduleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

export default AddNewScheduleModal;
