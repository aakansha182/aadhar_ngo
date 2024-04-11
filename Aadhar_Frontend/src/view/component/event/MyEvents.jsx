import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const MyEvents = ({userdetails}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch event data from backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/volunteer/getoneuserevents/${userdetails.email}`); // Replace '/api/events' with your actual API endpoint
        setEvents(response.data[0]); // Set the fetched events in state
        console.log(events[0][0])
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the fetchEvents function
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Events Data</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registered At
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          {(events.length>0 && events[0]!=undefined) ? events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">{event.event_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{event.event_catagory}</td>
              <td className="px-6 py-4 whitespace-nowrap">{event.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{event.address}</td>
            </tr>
          )):<h1 className='text-center bg-gray-500 py-3'>you didn't participated in any Event!</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default MyEvents;
