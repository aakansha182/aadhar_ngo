import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router';
function AddEvent() {
  const [eventName, setEventName] = useState('');
  const [catagory, setCatagory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate=useNavigate();
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

    axios.post('http://localhost:5000/events/addevent', formData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          alert('Event added successfully');
          document.getElementById('addeventid').reset();
        //  navigate('/adminevents')
          window.location.reload();
        } else {
          alert('Can\'t add event');
        }
      })
      .catch(error => {
        console.error('Error adding event: ', error);
        
      });
  };



  return (
    <div className="container mx-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Add Event</h2>
      <form onSubmit={handleSubmit} className="max-w-lg" id="addeventid">
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
        </div><p className="text-red-700">{formErrors.ename}</p>
        <div className="mb-4">
          <label htmlFor="catagory" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="catagory"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            required
          />
        </div><p className="text-red-700">{formErrors.catagory}</p>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div><p className="text-red-700">{formErrors.desc}</p>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleImageChange}
            required
          />
        </div><p className="text-red-700">{formErrors.img}</p>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
