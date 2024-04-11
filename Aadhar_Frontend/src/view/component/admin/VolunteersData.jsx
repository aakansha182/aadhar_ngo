import React, { useState, useEffect } from 'react';

const VolunteersData = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('your_backend_endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch volunteers');
      }
      const data = await response.json();
      setVolunteers(data); // Assuming data is an array of volunteer objects
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-4">Volunteer Details</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left text-white">Name</th>
            <th className="text-left text-white">Email</th>
            <th className="text-left text-white">Phone Number</th>
            <th className="text-left text-white">Event Name</th>
            <th className="text-left text-white">Address</th>
            <th className="text-left text-white">Event Category</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
              <td className="text-white">{volunteer.vname}</td>
              <td className="text-white">{volunteer.email}</td>
              <td className="text-white">{volunteer.phoneno}</td>
              <td className="text-white">{volunteer.event_name}</td>
              <td className="text-white">{volunteer.address}</td>
              <td className="text-white">{volunteer.event_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteersData;
