import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import '../../styles/Navbar.css';
import '../../styles/buttons.css';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, FIRST_NAME, LAST_NAME, USER_ID } from "../../constants";

const Menu = () => (
  <>
    <p><a href="#Schedule">Schedules</a></p>
    <p><a href="#Previous Games">Pitch Counts</a></p>
    <p><a href="https://www.psaplano.org/Home.aspx" target='_blank'>PSA Website</a></p>
  </>
);

const MyTeams = () => (
  <div className="dropdown">
    <button className="dropbtn">My Teams</button>
    <div className="dropdown-content">
      <a href='/my-teams'>All Teams</a>
      <a href="/my-teams">Team 1</a>
      <a href="/my-teams">Team 2</a>
      <a href="/my-teams">Team 3</a>
    </div>
  </div>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(FIRST_NAME);
    localStorage.removeItem(LAST_NAME);
    localStorage.removeItem(USER_ID);
    navigate('/sign-in');
  };

  return (
    <div className="navbar">
      <div className="navbar-links-container">
        <div className={`navbar-links ${toggleMenu ? 'show' : ''}`}>
          <MyTeams />
          <Menu />
          <button type="button" className='sign-out-button2' onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
        </div>
      </div>
      <div className="navbar-signin">

      </div>
      <div className="navbar-menu">
        {toggleMenu
          ? <RiCloseLine color='#040C18' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#040C18' size={27} onClick={() => setToggleMenu(true)} />
        }
      </div>
    </div>
  );
};

export default Navbar;
