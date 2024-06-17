import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants"
import api from '../../api'
import PropTypes from 'prop-types';
import '../../styles/Form.css'

function RegisterForm({route, method}) {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {first_name, last_name, email, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
                navigate('/')
            } else {
                navigate('/sign-in')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const Register = () => {
        setLoading(true)
        if (method === 'login') {
            navigate('/register')
        } else {
            navigate('/sign-in')
        }
    }

  return (
   <form onSubmit={handleSubmit} className="form-container">
        <h2>Get Started</h2>
        <input 
        className="form-input"
        type="text"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        />
        <input 
        className="form-input"
        type="text"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        />
        <input 
            className="form-input"
            type="text"
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
        {loading ? 'Creating New Account...' : 'Register'}
        </button>

        <button className="form-button" onClick={Register}> 
        Sign In
        </button>
   </form>
  )
}

RegisterForm.propTypes = {
    route: PropTypes.node.isRequired,
    method: PropTypes.node.isRequired,
};

export default RegisterForm