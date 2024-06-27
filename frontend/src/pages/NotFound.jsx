import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, FIRST_NAME, LAST_NAME } from '../constants';
import video from '../assets/flamingos.mp4';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  const [coachTeams, setCoachTeams] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
        'Accept': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCoachTeams(data))
      .catch((error) => console.error('Error fetching coach teams:', error));
  };

  const navigateTo = (path) => {
    navigate(path);
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      fetchTeams(token);
    }
  };

  return (
    <div className='not-found'>
      <video src={video} autoPlay loop muted style={{ width: 700, height: 'auto' }} />

      <span onClick={() => navigateTo('/')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
        Return to Home
      </span>
    </div>
  );
}

export default NotFound;
