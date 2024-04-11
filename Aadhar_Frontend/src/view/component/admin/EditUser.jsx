// EditUser.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
function EditUser() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const {id}=useParams();
  const navigate=useNavigate();
    useEffect(()=>{
     fetch(`http://localhost:5000/users/${id}`).then(data=>data.json()).then(data=>{
      console.log(data)
       setEmail(data.email)
       setUserName(data.name)
       setUserType(data.user)
     })
    },[id])
  
  

  const handleSave =async (e) => {
    e.preventDefault();
    // Here you can implement the logic to save the user details
    if(userName!=""&&userType!=""&&email!=""){
    console.log('User Name:', userName);
    console.log('Email:', email);
    console.log('User Type:', userType);
    console.log('user id',id);
    let details={
        name:userName,
        email:email,
        userType:userType
    }
  fetch(`http://localhost:5000/updateusers/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(details)
    }).then(data=>data.json()).then(data=>{if(data.length>0){alert('user updated successfully!')
    navigate('/adminusers');
  }else{alert('not updated!')}}).catch(e=>{console.log(e)})
   
  }
else{
  alert('please enter all the details')
}
}

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-700 font-semibold">User Name</label>
        <input type="text"  id="userName" className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
        <input type="email" required id="email" className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="userType" className="block text-gray-700 font-semibold">User Type</label>
        <select id="userType" className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800" value={userType} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditUser;
