import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
function EditEvent() {
  const [eventName, setEventName] = useState('');
  const [catagory, setcatagory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
    const {id}=useParams()
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch event data from your database for editing
    axios.get(`http://localhost:5000/events/getoneevent/${id}`)
      .then(response => {
        console.log('get event',response)
        const eventData = response.data;
        setEventName(eventData.ename);
        setcatagory(eventData.catagory);
        setDescription(eventData.description);
        // Set image if available
      })
      .catch(error => {
        console.error('Error fetching event data for editing: ', error);
      });
  }, [id]); // Make sure to include id in dependencies array to fetch data when it changes

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('ename', eventName);
    formData.append('catagory', catagory);
    formData.append('description', description);
    formData.append('image', image);

    axios.put(`http://localhost:5000/events/update/${id}`, formData)
      .then(response => {
        alert('Event updated successfully!');
        // Clear form fields or show success message
       navigate('/adminevents')
      })
      .catch(error => {
        console.error('Error updating event: ', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div className="container mx-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="eventName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="catagory" className="block text-sm font-medium text-gray-700">catagory</label>
          <input
            type="text"
            id="catagory"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={catagory}
            onChange={(e) => setcatagory(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleImageChange} required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
