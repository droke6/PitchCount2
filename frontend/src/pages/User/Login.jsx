import LoginForm from '../../components/UserComponents/LoginForm';
import Footer from '../../components/UserComponents/Footer'

function Login() {
    return (
        <>
          <h1 style={{'textAlign': 'center'}}>PSA Pitch Count</h1>
          <LoginForm route='/api/login/' method='login' />
          <p style={{'textAlign': 'center'}}><a href="/admin-login">Admin Login</a></p>
          <Footer />
        </>
    );
}

export default Login;
