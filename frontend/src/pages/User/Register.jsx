import RegisterForm from '../../components/UserComponents/RegisterForm'

function Register() {
  return (
    <>
    <h1>Pitch Count</h1>
    <RegisterForm route='/api/register/' method='register' />
    </>
  )
}

export default Register