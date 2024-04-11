import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sample2 from './Sample 2.gif';
import Admin from "../admin/Admin";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import "../../../styles/Loginregister/Signin.css";

const Sigin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [user, setUserType] = useState("");
  const [Key, setKey] = useState("");
  const [signindata, setsignin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "" // Error state for user type
  }); 
  const [passwordStrength, setPasswordStrength] = useState(""); // State for password strength indication

  const formHandler = (e) => {
    setsignin({ ...signindata, [e.target.name]: e.target.value });
    // Update password strength
    const password = e.target.value;
    setPasswordStrength(checkPasswordStrength(password));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset error messages
    let isValid = true;

    // Validation for empty fields
    for (const key in signindata) {
      if (!signindata[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "This field is required.",
        }));
        isValid = false;
      }
    }

    // Validation for matching passwords
    if (signindata.password !== signindata.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      isValid = false;
    }

    // Email validation
    if (!validateEmail(signindata.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      isValid = false;
    }

    // Password length validation
    if (signindata.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    }

    // User type validation
    if (!user) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userType: "Please select user type.",
      }));
      isValid = false;
    }

    if (isValid) {
      if (user === "Admin" && Key !== "ngo@657483@") {
        alert("Invalid Admin");
      } else {
        const resp = await fetch('http://localhost:5000/adduser', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...signindata, user }),
        });
        resp.json().then(data => {
          if (data.email !== undefined || data.email !== null) {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', true);
            onLogin();
            {user === "Admin" ? navigate('/Admin') : navigate('/')}
          }
        });
        alert("Registration successful!"); // Alert message upon successful registration
      }
    }
  };

  // Function to validate email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    // Implement your password strength criteria here
    if (password.length < 6) {
      return "Weak";
    } else if (password.length < 10) {
      return "Medium";
    } else {
      return "Strong";
    }
  };

  return (
    <section>
      <div className="section-container">
        <div className="form-container">
          <div className="form-wrapper">
            <h2 className="form-title">Signup</h2>
            <p className="form-subtitle">
              Don&apos;t have an account?{' '}
              <Link
                to="/signin"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={submitForm} className="mt-8">
              <div className="space-y-5">
                <p className="input-label">User Type :</p>
                <div className="flex ml-5">
                  <p>User</p>{" "}<input className="mr-5 ml-2" type="radio" name="userType" value='User' onChange={(e) => setUserType(e.target.value)} />
                  <p>Admin</p>{" "}<input className="mr-5 ml-2" type="radio" name="userType" value='Admin' onChange={(e) => setUserType(e.target.value)} />
                </div>
                {errors.userType && <p className="text-red-500">{errors.userType}</p>}
                {user === "Admin" && (
                  <>
                    <p className="input-label">Secret Key :</p>
                    <input type="text" className="input-field" placeholder="Secret key" onChange={(e) => setKey(e.target.value)} />
                  </>
                )}

                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Name"
                    onChange={formHandler}
                    value={signindata.name}
                    name="name"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    onChange={formHandler}
                    value={signindata.email}
                    name="email"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="input-wrapper">
                  <div className="relative">
                    <input
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={formHandler}
                      value={signindata.password}
                      name="password"
                    />
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline input-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </a>
                  </div>
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div className="input-wrapper">
                  <div className="relative">
                    <input
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      onChange={formHandler}
                      value={signindata.confirmPassword}
                      name="confirmPassword"
                    />
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline input-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </a>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                </div>
                <div className="text-gray-500 text-sm">{passwordStrength && `Password Strength: ${passwordStrength}`}</div>
                <div>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="image-container">
          <img
            className="image"
            src={sample2}
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

export default Sigin;