import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './view/component/landingpage/LandingPage.jsx'
import About from './view/component/about/About.jsx'
import Event from './view/component/event/Event.jsx';
import Donate from './view/component/donate/Donate.jsx';
import Contact from './view/component/contact/Contact.jsx';
import Login from './view/component/UserRegistration/Login.jsx';
import Signin from './view/component/UserRegistration/Signin.jsx';
import Navbar from './view/component/Navbar.jsx';
import Volunteer from './view/component/event/Volunteer.jsx';
import Admin from './view/component/admin/Admin.jsx';
import AdminNavbar from './view/component/admin/AdminNavbar.jsx';
import EditUser from './view/component/admin/EditUser.jsx';
import DeleteUser from './view/component/admin/DeleteUser.jsx';
import AdminDonations from './view/component/admin/AdminDonations.jsx';
import AdminEvents from './view/component/admin/AdminEvents.jsx';
import AdminUsers from './view/component/admin/AdminUsers.jsx';
import AdminVolunteers from './view/component/admin/AdminVolunteers.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import EditEvent from './view/component/admin/EditEvent.jsx';
import EditVolunteers from './view/component/admin/EditVolunteers.jsx';
import MyDonation from './view/component/donate/MyDonation.jsx';
import MyEvents from './view/component/event/MyEvents.jsx';
import ForgotPassword from './view/component/UserRegistration/ForgotPassword.jsx';
import ResetPassword from './view/component/UserRegistration/ResetPassword.jsx';
import BlogsHomepage from './view/component/Blogs/BlogsHomepage.jsx';
import SingleBlogpage from './view/component/Blogs/SingleBlogpage.jsx';
import EditBlog from './view/component/admin/EditBlog.jsx';
import MissionVisionPage from './view/component/missionvision/mission&vision.jsx';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check localStorage for login status on initial render
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  const [username,setusername]=useState({});

 
  const handleLogin = () => {
    if (localStorage.getItem('user')!=null && localStorage.getItem('user')!=undefined) {
      setIsLoggedIn(true);
      setusername(JSON.parse(localStorage.getItem('user')));
     
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

  };
 
  return (
    <div>
      <Router>
      {(JSON.parse(localStorage.getItem('user'))==null) || JSON.parse(localStorage.getItem('user')).user == "User" ?<Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userdetails={JSON.parse(localStorage.getItem('user'))}/>:<AdminNavbar onLogout={handleLogout} />}
      <Routes>

      {/* {JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user == "Admin" ?(<Route path="/Admin" element={<AdminNavbar onLogout={handleLogout} /> }/>) :null} */}
    
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Event />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blogs' element={<BlogsHomepage />} />
          <Route path='/blogs/:id' element={<SingleBlogpage />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/signin' element={<Signin onLogin={handleLogin} />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path='/mydonations' element={<MyDonation userdetails={JSON.parse(localStorage.getItem('user'))}/>} />
          <Route path='/myevents' element={<MyEvents userdetails={JSON.parse(localStorage.getItem('user'))}/>} />
          <Route path='/mission&vision' element={<MissionVisionPage userdetails={JSON.parse(localStorage.getItem('mission&vision'))}/>} />


          {/* <Route path='/Admin' element={JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user ? null : null} /> */}
          {/* <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminevents" element={<AdminEvents />} />
          <Route path="/adminvolunteers" element={<AdminVolunteers />} />
  <Route path="/admindonations" element={<AdminDonations />} />*/}
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/deleteuser/:id" element={<DeleteUser />} /> 
          <Route path="/editevent/:id" element={<EditEvent />} /> 
          <Route path="/editvolunteers/:id" element={<EditVolunteers />} /> 
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id' element={<ResetPassword/>}/>
          <Route path="/editblog/:id" element={<EditBlog/>}/>
          {/* <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminevents" element={<AdminEvents />} />
          <Route path="/adminvolunteers" element={<AdminVolunteers />} />
          <Route path="/admindonations" element={<AdminDonations />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/deleteuser/:id" element={<DeleteUser />} /> */}
        </Routes>
    </Router>
    </div>
  );
}

export default App;



