import { Box, IconButton } from '@mui/material';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter teams based on the search term
    if (value) {
      const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredTeams);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (teamId) => {
    navigate(`/team-details/${teamId}`);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box position="relative" display="flex" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1, width: 190 }}
          placeholder='Search Teams or Players'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>

        {/* Display search results only if searchTerm is not empty */}
        {searchTerm && searchResults.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            top="100%"  // Move the box below the search bar
            left={0}
            zIndex="10"
            mt={1} // Add some space between the search bar and the results
            sx={{
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              width: "250px",
              maxHeight: "300px",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            {searchResults.map((team, index) => (
              <Box
                key={index}
                onClick={() => handleResultClick(team.id)}
                sx={{
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                  '&:last-child': {
                    borderBottom: "none",
                  },
                  '&:hover': {
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  }
                }}
              >
                {team.name} (Active)
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box display="flex">
        <IconButton>C</IconButton>
        <IconButton>B</IconButton>
        <IconButton>A</IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
