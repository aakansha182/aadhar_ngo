import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
const navigate=useNavigate();
  useEffect(() => {
    // Fetch users from the database when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allusers'); // Change the endpoint as per your API
      setUsers(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteusers/${userId}`); // Change the endpoint as per your API
      // After deleting, fetch users again to update the list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async () => {
    try {
      await axios.put(`/api/users/${editingUserId}`, { name: editedUserName }); // Change the endpoint as per your API
      // After editing, fetch users again to update the list
      fetchUsers();
      // Reset editing state
      setEditingUserId(null);
      setEditedUserName('');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-6 py-3">
                    User ID
                </th>
            <th scope="col" className="px-6 py-3">
                    User Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    UsetType
                </th>
                <th scope="col" className="px-6 py-3">
                    Edit
                </th>
                <th scope="col" className="px-6 py-3">
                    Delete
                </th>
                
                </tr></thead>
                <tbody>
        {users.map(user => (
        
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">{user.id}</td>
        <td className="w-4 p-4">{user.name}</td>
        <td className="w-4 p-4">{user.email}</td>
        <td className="w-4 p-4">{user.userType}</td>
                
                <td className="w-4 p-4 text-blue-600" ><Link to={`/edituser/${user.id}`}>Edit</Link></td>
                <td className="w-4 p-4 text-red-600"><Link onClick={()=>deleteUser(user.id)}>Delete</Link></td>
              </tr>
            ))}
        </tbody>
       
      </table>
    </div>
    </div>
  );
};

export default AdminUser;
