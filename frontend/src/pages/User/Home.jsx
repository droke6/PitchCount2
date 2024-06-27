import React, { useState, useEffect } from 'react';
import Topbar from '../../components/UserComponents/Topbar';
import SideBar from "../../components/UserComponents/SideBar";
import '../../styles/Home.css';
import TeamGrid from "../../components/UserComponents/TeamGrid";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, USER_ID } from '../../constants';
import { refreshAccessToken } from '../../utils/tokenUtils';  // Import the utility

function Home() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const userId = localStorage.getItem(USER_ID);

    if (token && userId) {
      fetchTeams(token, userId);
    }
  }, []);

  const fetchTeams = async (token, userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/teams/?coach=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchTeams(newToken, userId);
            return;
          } else {
            handleLogout();
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_ID);
    navigate('/sign-in');
  };

  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="content">
          <Topbar teams={teams} />
          <h1 style={{'textAlign': 'center', 'marginBottom': -30}}>My Teams</h1>
          <TeamGrid teams={teams}/>
        </div>
      </div>
    </>
  );
}

export default Home;
