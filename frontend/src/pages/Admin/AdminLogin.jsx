import AdminForm from '../../components/AdminComponents/AdminForm'

function Login() {
  return (
    <>
    <h1>PSA Pitch Count Admin</h1>
    This system is for the use of PSA employees only.  Any other access is prohibited.
    <AdminForm route='/api/token/' method='login' />
    <p><a href="/sign-in">User Login</a></p>
    </>
  )
}

export default Login