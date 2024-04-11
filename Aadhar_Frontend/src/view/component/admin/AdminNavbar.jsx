// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminUsers from './AdminUsers';
import AdminEvents from './AdminEvents';
import AdminDonations from './AdminDonations';
import AdminVolunteers from './AdminVolunteers';
import { useNavigate } from 'react-router-dom';
import AddEvents from './AddEvents';
import AddBlogs from './AddBlogs';
import AdminBlogs from './AdminBlogs';
function AdminNavbar({islogin}) {
  const [index, setIndex] = useState(0);
    const navigate=useNavigate();
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

  const RenderComponent = ({ index }) => {
    switch (index) {
      case 0:
        return <AdminUsers />;
      case 1:
        return <AdminEvents />;
      case 2:
        return <AdminDonations />;
      case 3:
        return <AdminVolunteers />;
      case 4:
        return <AddEvents />;
      case 5:
        return <AddBlogs />;
      case 6:
        return <AdminBlogs />;
      default:
        return null;
    }
  };

  return (
    <div className=''>
      <nav className="bg-gray-800 text-gray-100  h-20 min-h-28">
        <div className="p-4">
          <h1 className="text-lg font-bold mb-4 a">Admin Panel</h1>
          <ul className='flex my-2'>
            <li>
              <Link to="/adminusers" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(0)}>Users</Link>
            </li>
            <li>
              <Link to="/adminevents" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(1)}>Events</Link>
            </li>
            <li>
              <Link to="/adminvolunteers" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(3)}>Volunteers</Link>
            </li>
            <li>
              <Link to="/admindonations" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(2)}>Donations</Link>
            </li>
            <li>
              <Link to="/adminblogs" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(6)}>Blogs</Link>
            </li>
            <li>
              <Link to="/addevent" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(4)}>Add Events</Link>
            </li>
            <li>
              <Link to="/addblogs" className="block py-2 px-4 hover:bg-gray-700" onClick={() => handleIndexChange(5)}>Add Blogs</Link>
            </li>
          <li><Link onClick={()=>{localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            islogin();
            navigate('/');
        }}>LogOut</Link></li>
          </ul>
          
        </div>
      </nav>
      <div className='m-8'>
        <RenderComponent index={index} />
      </div>
    </div>
  );
}

export default AdminNavbar;
