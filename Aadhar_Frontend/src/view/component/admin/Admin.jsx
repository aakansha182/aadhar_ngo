// App.js
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminUsers from './AdminUsers';
import AdminEvents from './AdminEvents';
import AdminVolunteers from './AdminVolunteers';
import AdminDonations from './AdminDonations';
// import { Link, Routes } from 'react-router-dom';
import { Route,Router ,Routes,Link} from 'react-router-dom';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import AddBlogs from './AddBlogs';
import AdminBlogs from './AdminBlogs';
const Admin=()=> {
  

  return (
   <div>
      
      <div className="flex h-screen">
        <div className="w-4/5 bg-gray-100 overflow-y-auto">
          <Router>
        <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminevents" element={<AdminEvents />} />
          <Route path="/adminvolunteers" element={<AdminVolunteers />} />
          <Route path="/admindonations" element={<AdminDonations />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/deleteuser/:id" element={<DeleteUser />} />
          <Route path="/addblogs" element={<AddBlogs/>}/>
          <Route path="/adminblogs" element={<AdminBlogs/>}/>
         
       </Router>
       </div>
      </div>
      </div>
    
  );
}

export default Admin;
