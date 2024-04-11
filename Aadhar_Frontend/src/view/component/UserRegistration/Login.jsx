import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import loginlogo from "./Sample 2.gif";
const Login=({ onLogin })=>{
  
  const navigate=useNavigate();
  const [logindata,setlogin]=useState({
    email:"",
    password:""
  })
  // const handleLogin = (e) => {
  //   // Assuming your login process here
  //   localStorage.setItem('isLoggedIn', true);
  //   onLogin(); // Notify the parent component (App) about the login
  // };

  const formHandler=(e)=>{
    setlogin({...logindata,[e.target.name]:e.target.value});
  }
  const handleLogin=async (e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(logindata)
    }).then(data=>data.json()).then(resp=>{
      console.log(resp.msg)
      if(resp.email!==undefined ||resp.email!==null){
      if(resp.msg=="ok"){localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('user',JSON.stringify(resp))
        onLogin(); 
        { JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).user=="Admin"?navigate('/Admin'):navigate('/')}
      }else{alert('enter correct details')}
      }else{
        alert('user not found')
      }
    })
    .catch(err=>console.log(err))
   
  }
   return (
    <section>
      <div className="section-container">
        <div className="form-container">
          <div className="form-wrapper">
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">
              Don&apos;t have an account?{" "}
              <Link
                to="/signin"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div className="input-wrapper">
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    onChange={formHandler}
                    value={logindata.email}
                    name="email"
                  ></input>
                </div>
                <div className="input-wrapper">
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    onChange={formHandler}
                    value={logindata.password}
                    name="password"
                  ></input>
                </div>
                <div>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={handleLogin}
                  >
                    Get started
                  </button>
                </div>
                <Link to="/forgot-password"  className="font-semibold text-black hover:text-blue-700 transition-all duration-200 hover:underline py-4">Forgot Password ?</Link>

              </div>
            </form>
          </div>
        </div>
        <div className="image-container">
          <img
            className="image"
            src={loginlogo}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Login;