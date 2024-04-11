import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
const EditVolunteers = () => {
 const navigate=useNavigate()
    const {id}=useParams()
  const [volunteer, setVolunteer] = useState({
    vname: '',
    email: '',
    phoneno: '',
    event_name: '',
    address: '',
    event_category: ''
  });

  useEffect(() => {
    fetchVolunteerDetails();
  }, []);

  const fetchVolunteerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/volunteer/getVolunteer/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer details');
      }
      const data = await response.json();
      setVolunteer(data); // Assuming data is an object representing volunteer details
    } catch (error) {
      console.error('Error fetching volunteer details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/volunteer/editVolunteer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(volunteer)
      });
      if (!response.ok) {
        throw new Error('Failed to update volunteer details');
      }
      alert('Volunteer details updated successfully');
      navigate('/adminvolunteets')
      
      
    } catch (error) {
      console.error('Error updating volunteer details:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-20 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Edit Volunteer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name="vname" value={volunteer.vname} onChange={handleChange} required  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" name="email" value={volunteer.email} onChange={handleChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <input type="text" name="phoneno" value={volunteer.phoneno} onChange={handleChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Name:</label>
          <input type="text" name="event_name" value={volunteer.event_name} onChange={handleChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
          <input type="text" name="address" value={volunteer.address} onChange={handleChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Category:</label>
          <input type="text" name="event_category" value={volunteer.event_category} required onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVolunteers;
