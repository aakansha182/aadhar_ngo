import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('http://localhost:5000/volunteer/getAllVolunteers');
      if (!response.ok) {
        throw new Error('Failed to fetch volunteers');
      }
      const data = await response.json();
      setVolunteers(data); // Assuming data is an array of volunteer objects
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/volunteer/deleteVolunteer/${id}`); // Change the endpoint as per your API
      // After deleting, fetch users again to update the list
      AdminVolunteers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className="mx-auto bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-4">Volunteer Details</h2>
      <table className="h-28 w-full table-auto">
        <thead>
          <tr>
            <th className="text-left text-white">Name</th>
            <th className="text-left text-white">Email</th>
            <th className="text-left text-white">Phone Number</th>
            <th className="text-left text-white">Event Name</th>
            <th className="text-left text-white">Address</th>
            <th className="text-left text-white">Event Category</th>
            <th className="text-left text-white">Edit Volunteer</th>
            <th className="text-left text-white">Delete Volunteer</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-450' : 'bg-gray-500'}>
              <td className="text-white">{volunteer.vname}</td>
              <td className="text-white">{volunteer.email}</td>
              <td className="text-white">{volunteer.phoneno}</td>
              <td className="text-white">{volunteer.event_name}</td>
              <td className="text-white">{volunteer.address}</td>
              <td className="text-white">{volunteer.event_catagory}</td>
              <td className="text-blue-700  "><Link className="text-blue-600"to={`/editvolunteers/${volunteer.id}`}>Edit</Link></td>
              <td className="text-red-700 "><Link onClick={()=>deleteVolunteer(volunteer.id)}>Delete</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVolunteers;
