import React, { useState, useEffect } from 'react';

const AdminDonation = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:5000/getdontiondetails');
      if (!response.ok) {
        throw new Error('Failed to fetch donation data');
      }
      const data = await response.json();
      console.log(data)
      setDonations(data);
      // console.log(donations)
    } catch (error) {
      console.error('Error fetching donation data:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Donor Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Payment ID</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {donations.map((donation, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
              <td className="border px-4 py-2">{donation.dname}</td>
              <td className="border px-4 py-2">{donation.phoneno}</td>
              <td className="border px-4 py-2">{donation.email}</td>
              <td className="border px-4 py-2">{donation.amount}</td>
              <td className="border px-4 py-2">{donation.category}</td>
              <td className="border px-4 py-2">{donation.payment_id}</td>
              <td className="border px-4 py-2">{donation.donstatus?"true":"false"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonation;
