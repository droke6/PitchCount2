import React, { useState, useEffect } from 'react';
import Topbar from '../../components/UserComponents/Topbar';
import SideBar from "../../components/UserComponents/SideBar";
import '../../styles/Home.css';
import TeamGrid from "../../components/UserComponents/TeamGrid";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, USER_ID } from '../../constants';

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

  const fetchTeams = (token, userId) => {
    fetch(`http://localhost:8000/api/teams/?coach=${userId}`, {
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
    .then(data => {
      setTeams(data);
    })
    .catch(error => console.error('Error fetching teams:', error));
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
          <TeamGrid teams={teams}/>
        </div>
      </div>
    </>
  );
}

export default Home;
