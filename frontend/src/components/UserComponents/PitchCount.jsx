// EnterPitchCount.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const EnterPitchCount = () => {
    const [teams, setTeams] = useState([]); // Ensure initial state is an empty array
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [pitchCount, setPitchCount] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('/api/teams/');
                setTeams(response.data); // Ensure the response data is set correctly
            } catch (error) {
                console.error('Error fetching teams:', error);
                setTeams([]); // Fallback to an empty array in case of error
            }
        };
        fetchTeams();
    }, []);

    const handleTeamChange = async (e) => {
        setSelectedTeam(e.target.value);
        try {
            const response = await axios.get(`/api/games/?team=${e.target.value}`);
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
            setGames([]); // Fallback to an empty array in case of error
        }
    };

    const handleGameChange = async (e) => {
        setSelectedGame(e.target.value);
        try {
            const response = await axios.get(`/api/players/?team=${selectedTeam}`);
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
            setPlayers([]); // Fallback to an empty array in case of error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/pitch_counts/', {
                player: selectedPlayer,
                game: selectedGame,
                count: pitchCount,
            });
            alert('Pitch count submitted successfully');
        } catch (error) {
            console.error('Error submitting pitch count:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Team:</label>
                <select value={selectedTeam} onChange={handleTeamChange}>
                    <option value="">Select a team</option>
                    {Array.isArray(teams) && teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Game:</label>
                <select value={selectedGame} onChange={handleGameChange}>
                    <option value="">Select a game</option>
                    {Array.isArray(games) && games.map((game) => (
                        <option key={game.id} value={game.id}>{game.date}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Player:</label>
                <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
                    <option value="">Select a player</option>
                    {Array.isArray(players) && players.map((player) => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Pitch Count:</label>
                <input type="number" value={pitchCount} onChange={(e) => setPitchCount(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EnterPitchCount;
