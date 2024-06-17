import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import PropTypes from 'prop-types';
import '../../styles/Form.css';

function LoginForm({ route, method }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? "Login" : "Register";
    const name2 = method === "login" ? "Create an Account" : "Sign Into Account";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { email, password });
            console.log('Response:', res.data);
            if (method === 'login') {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                localStorage.setItem('first_name', res.data.first_name);  // Store first_name
                localStorage.setItem('last_name', res.data.last_name);  // Store last_name
                localStorage.setItem('user_id', res.data.user_id);  // Store user_id (coach ID)
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.detail || error.message);
        } finally {
            setLoading(false);
        }
    };

    const Register = () => {
        if (method === 'login') {
            navigate('/register');
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Get Started</h2>
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                {loading ? 'Signing In...' : name}
            </button>
            <button className="form-button" type="button" onClick={Register}>
                {name2}
            </button>
        </form>
    );
}

LoginForm.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
};

export default LoginForm;
