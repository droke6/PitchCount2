import { useState } from 'react';
import { RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import '../../styles/Navbar.css';
import '../../styles/buttons.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants"

const Menu = () =>(
  <>
  <p><a href="#faq">All Seasons</a></p>
  <p><a href="#pricing">Divisions</a></p>
  <p><a href="/manage-teams">Manage Accounts</a></p>
  <p><a href="#catalog">DaySmart</a></p>
  </>
)

const AdminNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  AdminNavbar.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    showLogin: PropTypes.bool.isRequired,
  };

//   function navigateTo(path) {
//       navigate(path)
//   }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  };

  return (
    <div className="navbar">
    <div className="navbar-links">
      <div className="navbar-links_container">
        <Menu />
      </div>
    </div>
    <div className="navbar-signin">
        <button type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }} >
          Sign Out
        </button>
    </div>
    <div className="navbar-menu">
      {toggleMenu
        ? <RiCloseLine color='#040C18' size={27} onClick={() => setToggleMenu(false)}/>
        : <RiMenu3Line color='#040C18' size={27} onClick={() => setToggleMenu(true)}/>
      }
      {toggleMenu && (
        <div className="menu_container scale-up-center">
          <div className="menu_container-links">
            <div className="menu_container-links_signin">
              <Menu /> 
              <button className='sign-out-button2' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }} >
              Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  )
}

export default AdminNavbar