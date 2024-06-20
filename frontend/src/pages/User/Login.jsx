import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, FIRST_NAME, LAST_NAME, USER_ID } from "../../constants";
import api from '../../api';
import '../../styles/Login.css';

function Login() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, method) => {
    setLoading(true);
    e.preventDefault();

    let route;
    if (method === 'register') {
      route = '/api/register/';
    } else if (method === 'login') {
      route = '/api/login/';
    }

    try {
      const res = await api.post(route, { first_name, last_name, email, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem(FIRST_NAME, res.data.first_name);
        localStorage.setItem(LAST_NAME, res.data.last_name);
        localStorage.setItem(USER_ID, res.data.user_id);
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
        navigate('/');
      } else {
        document.getElementById('chk').checked = false;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="credentials-page">
    <div className="page">
      <h1 className="bounce-in">PITCH</h1>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        
        <div className="register">
          <form onSubmit={(e) => handleSubmit(e, 'register')}>
            <label htmlFor="chk" aria-hidden="true">Sign Up</label>
            <input value={first_name} onChange={(e) => setFirstName(e.target.value)} type="text" name="txt" placeholder="First Name" required />
            <input value={last_name} onChange={(e) => setLastName(e.target.value)} type="text" name="txt" placeholder="Last Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required />
            <button className='button' type="submit"> {loading ? 'Creating Account' : 'Register'} </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required />
            <button className='button' type="submit">Login</button>
          </form>
        </div>
        
      </div>
      <h1 className="bounce-in2">COUNT</h1>
    </div>
    </div>
  );
}

export default Login;
