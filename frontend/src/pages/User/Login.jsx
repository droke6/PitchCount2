import LoginForm from '../../components/UserComponents/LoginForm';

function Login() {
    return (
        <>
          <h1>PSA Pitch Count</h1>
          <LoginForm route='/api/login/' method='login' />
          <p><a href="/admin-login">Admin Login</a></p>
        </>
    );
}

export default Login;
