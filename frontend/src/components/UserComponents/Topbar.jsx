import { Box, IconButton } from '@mui/material';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';

const Topbar = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter teams based on the search term
    const filteredTeams = teams.filter(team =>
      team.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredTeams);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box 
        display="flex"
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1, width: 190 }}
          placeholder='Search Teams or Players'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <Box display="flex" flexDirection="column" position="absolute" zIndex="10" mt={2} bg="white" boxShadow="0 2px 4px rgba(0,0,0,0.1)" borderRadius="4px" width={190}>
          {searchResults.map((team, index) => (
            <Box key={index} p={1} borderBottom="1px solid #ddd">
              {team.name}
            </Box>
          ))}
        </Box>
      )}

      <Box display="flex">
        <IconButton>C</IconButton>
        <IconButton>B</IconButton>
        <IconButton>A</IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
