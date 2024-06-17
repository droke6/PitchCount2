import { useState, useEffect } from "react";
import Navbar from '../../components/UserComponents/Navbar';
import '../../styles/Home.css';
import '../../styles/buttons.css'
import TeamGrid from "../../components/UserComponents/TeamGrid";
// import { useNavigate } from 'react-router-dom';

function Home() {
  // const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

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

const teams = [];

const grade_level = []

  return (
    <>
    <h1>Welcome {first_name} {last_name}!</h1>
    <Navbar />
    <h2>My Teams</h2>
    <TeamGrid teams={teams} grade_level={grade_level}/>
    </>
  );
}

export default Home;
