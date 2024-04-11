import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
function EditBlog() {
  const [title, setTitle] = useState('');
  const [category, setcategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
    const {id}=useParams()
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch event data from your database for editing
    axios.get(`http://localhost:5000/blogs/getOneBlog/${id}`)
      .then(response => {
        console.log('get event',response)
        const respData = response.data;
        setTitle(respData.title);
        setcategory(respData.category);
        setDescription(respData.description);
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
    
    if(image!==null){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);

    axios.put(`http://localhost:5000/blogs/updateblog/${id}`, formData)
      .then(response => {
        alert('Blog updated successfully!');
        // Clear form fields or show success message
       navigate('/adminblogs')
      })
      .catch(error => {
        console.error('Error updating blog: ', error);
        // Handle error, show error message, etc.
      });
    }else{
        alert('image field is empty please provide the image')
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            id="eventName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">category</label>
          <input
            type="text"
            id="category"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
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
        onClick={handleSubmit}>
          Update Blog
        </button>
      </form>
    </div>
    
  );
}

export default EditBlog;
