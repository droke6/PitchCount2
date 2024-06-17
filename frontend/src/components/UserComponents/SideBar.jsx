// import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
// import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import '../../styles/Sidebar.css'
import { ACCESS_TOKEN, REFRESH_TOKEN, FIRST_NAME, LAST_NAME, USER_ID } from "../../constants"


const SideBar = () => {

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(FIRST_NAME);
        localStorage.removeItem(LAST_NAME);
        localStorage.removeItem(USER_ID)
        navigate('/sign-in');
      };

  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div>
      <Sidebar style={{height:"100vh"}}>
          <div>
            {/* <Box style={{display: "flex", justifyContent: "center", mt: "40px"}}>
              <AccountCircleSharpIcon onClick={() => navigateTo('/')} style={{width: "100px", height: "100px", cursor: "pointer"}}/>
            </Box> */}
            <Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="black"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {user && user.first_name} {user && user.last_name} */}

                </Typography>
              </Box>
            </Box>

          <Menu>
            <SubMenu label="Tournaments" style={{color:"#040C18", fontSize:"16px"}}>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
                <div onClick={() => navigateTo("/new-tournament")}> New Tournament </div>
              </MenuItem>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
              <div onClick={() => navigateTo("/OrderStatus")}> Tournament History </div>
              </MenuItem>
              <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
              <div onClick={() => navigateTo("/OrderHistory")}> Order History </div>
              </MenuItem>
            </SubMenu>
            
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Active Tournaments </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Calendar </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}> Contact Us </MenuItem>
          </Menu>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </Sidebar>
    </div>
  );
}

export default SideBar
