import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/homepage/HomePage.css';
import AadharLogo from './UserRegistration/adharblack.jpeg'; // Adjust the path accordingly

const menuItems = [
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Events',
    path: '/events',
  },
  {
    name: 'Donate',
    path: '/donate',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name:'Blogs',
    path:'/blogs',
  }
  
]

const Navbar=({ isLoggedIn, onLogout ,userdetails})=> {
  const navigate=useNavigate();
  const [user,setuser]=useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
console.log(userdetails)
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    onLogout(); // Notify the parent component (App) about the logout
   
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

   const [isHovered, setIsHovered] = useState(false);
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <div className="relative w-full bg-white nav">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          
        <Link to='/' className="font-bold logo">
  <img src={AadharLogo} alt="Aadhar Logo" style={{ height: '3em', marginRight: '0.5em' }} />
</Link>        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            { menuItems.map((item) => (
            (item.name!=null)? <>
              <li key={item.name}>
                {console.log(menuItems.length)}
                <Link
                  to={item.path}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
              
                </Link>
              </li>
            </>:""))}
          </ul>
        </div>
      
        <div className="hidden space-x-2 lg:block">
      { localStorage.getItem('isLoggedIn')?  <div className="relative">
      <div
        className="inline-block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onClick={handleMouseLeave}
      >
        {userdetails!=null?userdetails.name:""}
      </div>
      {isHovered && (
        <div className="absolute w-40 right-0 mt-2 bg-white rounded-lg shadow-md p-4 z-10 py-5">
          <ul>
            <li>
              <Link to="/mydonations" className="hover:text-red-600  rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">My Donations</Link>
            </li>
            <li>
              <Link to="/myevents" className="hover:text-red-600  rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">My Events</Link>
            </li>
            <li>
            <Link to='/login'
          onClick={handleLogout}
            className="hover:text-red-600 rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log Out
          </Link>
            </li>
          </ul>
        </div>
      )}
    </div>

    
         :
     <div>
          <Link
           to='/signin'
            className="hover:text-white hover:bg-black  rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign UP
          </Link>
          <Link
           to='/login'
            className="hover:text-white hover:bg-black rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </Link></div>
}
        </div>
        <div className="lg:hidden">
        <span  onClick={toggleMenu} className="h-6 w-6 cursor-pointer material-symbols-outlined">menu</span>
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    
                    <span className="font-bold logo">Aadhar</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <span className="material-symbols-outlined h-6 w-6">close</span>
                     
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        
                      </Link>
                    ))}
                  </nav>
                
                <div className="mt-60 space-y-2">
           { localStorage.getItem('isLoggedIn')?
           <div><Link to='/login'
          onClick={handleLogout}
            className="hover:text-white hover:bg-black rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log Out
          </Link></div>
        //   <nav>
        //   <li className="dropdown">
        //   <span className="dropbtn">Menu</span>
        //   <div className="dropdown-content">
        //     <Link to="/myevents">My Events</Link>
        //     <Link to="/mydonations">My Donations</Link>
        //     {isLoggedIn && (
        //       <Link to='/login'
        //       onClick={handleLogout}
        //         className="hover:text-white hover:bg-black rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        //       >
        //         Log Out
        //       </Link>
        //     )}
        //   </div>
        // </li>
        // </nav>
          :
          <div >
                  <Link
                    to='/signin'
                    className="hover:text-white hover:bg-black w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign UP
                  </Link>
                  <Link
                    to='/login'
                    className="hover:text-white hover:bg-black w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Log In
                  </Link>
                </div>
}
              </div>
          
          </div>
                  
      </div>
    </div>
    </div>
        )}
        </div>
        </div>
  )
}
export default Navbar;
