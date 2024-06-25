import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import '../../styles/Sidebar.css'
import { ACCESS_TOKEN, FIRST_NAME, REFRESH_TOKEN, USER_ID, LAST_NAME } from '../../constants'


const SideBar = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(FIRST_NAME);
    localStorage.removeItem(LAST_NAME);
    localStorage.removeItem(USER_ID);
    navigate('/sign-in');
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem('first_name');
    const storedLastName = localStorage.getItem('last_name');
    if (storedFirstName) {
        setFirstName(storedFirstName);
    }
    if (storedLastName) {
        setLastName(storedLastName);
    }
  }, []);

  return (
    <div>
      <Sidebar className='sidebar' style={{height:"100vh"}}>
          <div>
            <Box style={{display: "flex", justifyContent: "center", mt: "40px"}}>
              <AccountCircleSharpIcon onClick={() => navigateTo('/')} style={{width: "100px", height: "100px", cursor: "pointer"}}/>
            </Box>
            <Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="black"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {first_name} {last_name}
                </Typography>
              </Box>
            </Box>

          <Menu>
            <SubMenu label="My Teams" style={{color:"#040C18", fontSize:"16px"}}>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
                <div onClick={() => navigateTo("/")}> Team 1 </div>
              </MenuItem>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
              <div onClick={() => navigateTo("/OrderStatus")}> Team 2 </div>
              </MenuItem>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
              <div onClick={() => navigateTo("/OrderHistory")}> Team 3 </div>
              </MenuItem>
            </SubMenu>
            
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Rosters </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Schedules </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}} onClick={() => navigateTo('/reports')}> Reports </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}} onClick={() => navigateTo('/archived')}> Archived Players</MenuItem>
          </Menu>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </Sidebar>
    </div>
  );
}

export default SideBar
