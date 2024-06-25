import { Box, IconButton } from '@mui/material';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box 
        display="flex"
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1, width:190 }} placeholder='Search Teams or Players' />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton>
          C
        </IconButton>
        <IconButton>
          B
        </IconButton>
        <IconButton>
          A
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
