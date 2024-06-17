import { useEffect, useState } from 'react';
import api from '../../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('api/users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response?.data || error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await api.delete(`api/delete/${userId}/`);
            if (response.status === 204) {
                setUsers(users.filter(user => user.user_id !== userId));
                setMessage('User successfully deleted.');
            } else {
                setMessage('Error deleting user.');
            }
        } catch (error) {
            setMessage('Error deleting user.');
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
       <form className='form-container'>
            <h2>User List</h2>
            {message && <p>{message}</p>}
        
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Teams</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td></td>
                            <td>
                                <button onClick={() => handleDelete(user.user_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
};

export default UserList;
