import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const MyDonation = ({userdetails}) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donation data from backend when the component mounts
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getonedonation/${userdetails.email}`); // Replace '/api/donations' with your actual API endpoint
        setDonations(response.data[0]); // Set the fetched donations in state
        // console.log(response.data[0][0].donstatus)
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations(); // Call the fetchDonations function
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Donation Data</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {(donations.length>0) ? donations.map((donation) => (
            
            <tr key={donation.payment_id}>
              {console.log(donation.donstatus)}
              <td className="px-6 py-4 whitespace-nowrap">{donation.dname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.phoneno}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.payment_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{(donation.donstatus)?"true":"false"}</td>
            </tr>
          )):<h1 className='text-center bg-gray-500 py-3'>You didn't donated for any Category!</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonation;
