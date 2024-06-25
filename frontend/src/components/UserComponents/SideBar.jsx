import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import '../../styles/Sidebar.css'
import { ACCESS_TOKEN, FIRST_NAME, LAST_NAME, REFRESH_TOKEN, USER_ID } from '../../constants';

const SideBar = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [coachTeams, setCoachTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFirstName = localStorage.getItem(FIRST_NAME);
    const storedLastName = localStorage.getItem(LAST_NAME);
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
    if (storedLastName) {
      setLastName(storedLastName);
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeams(token); // Fetch teams when component mounts
    }
  }, []);

  const fetchTeams = (token) => {
    fetch('http://localhost:8000/api/teams/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setCoachTeams(data))
    .catch(error => console.error('Error fetching coach teams:', error));
  };

  const navigateTo = (path) => {
    navigate(path);
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeams(token); // Fetch teams when navigating to new page
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(FIRST_NAME);
    localStorage.removeItem(LAST_NAME);
    localStorage.removeItem(USER_ID);
    navigate('/sign-in');
  };

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
                {firstName} {lastName}
              </Typography>
            </Box>
          </Box>

          <Menu>
            <SubMenu label="My Teams" style={{color:"#040C18", fontSize:"16px"}}>
              {coachTeams.map((team, index) => (
                <MenuItem key={index} style={{color:"#040C18", fontSize:"16px"}}>
                  <div onClick={() => navigateTo(`/team-details/${team.id}`)}>
                    {team.grade}B - {team.name}
                  </div>
                </MenuItem>
              ))}
            </SubMenu>
            
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Rosters </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Schedules </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}} onClick={() => navigateTo('/reports')}> Reports </MenuItem>

            <SubMenu label="Archives" style={{color:"#040C18", fontSize:"16px"}}>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}} onClick={() => navigateTo('/archived')}> Archived Teams</MenuItem>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}} onClick={() => navigateTo('/archived')}> Archived Players</MenuItem>
            </SubMenu>

          </Menu>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideBar;
