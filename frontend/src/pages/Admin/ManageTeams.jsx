import AdminNavbar from "../../components/AdminComponents/AdminNavbar"
import UserList from "../../components/AdminComponents/DeleteUser" 

function ManageTeams() {
  return (
    <>
    <AdminNavbar />
    <div>ManageTeams</div>
    <UserList />
    <a href="/admin">Admin Home</a>
    </>
  )
}

export default ManageTeams