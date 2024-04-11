import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
    // Fetch events data from your database
    axios.get('http://localhost:5000/blogs/getAllBlogs')
      .then(response => {
        // console.log(response.data)
        setBlogs(response.data)
      })
      .catch(error => {
        console.error('Error fetching events data: ', error);
      });
  }, []); // Empty array as second argument to useEffect to run only once on component mount

  const deleteEvent = async (blogid) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/deleteblog/${blogid}`); // Change the endpoint as per your API
      // After deleting, fetch users again to update the list
      navigate('/adminblogs');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blogs List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Blog Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image</th>
              <th scope="col" className="px-6 py-3">Edit</th>
                <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.category}</td>
                <td className="border px-4 py-2">{blog.description}</td>
                <td className="border px-4 py-2">
                  <img src={`http://localhost:5000/`+blog.image} alt={blog.title} className="w-20 h-10" />
                </td>
                <td className="border text-blue-600 px-4 py-2"><Link to={`/editblog/${blog.id}`}>Edit</Link></td>
                <td className="border text-red-600 px-4 py-2"><Link onClick={()=>deleteEvent(blog.id)}>Delete</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBlogs;
