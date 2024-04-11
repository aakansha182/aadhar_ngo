import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Volenteer=()=>{
    const location = useLocation();
  // console.log(location.state.ename)
  const navigate=useNavigate();
  const [vdetails,setvdetails]=useState({
    name:"",
    age:"",
    phoneno:"",
    email:"",
    address:"",
    catagory:""
  })
  
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);

  const submitHandler=async()=>{
    try {
      if(vdetails.name!=""&&vdetails.age!=""&&vdetails.phoneno!=""&&vdetails.email!=""&&vdetails.category!=""){
        await axios.post('http://localhost:5000/volunteer/add', {
          to: vdetails.email,
          subject: `Thank You for Registering! ${location.state.ename} camp`,
          text: `Thank you Dear ${vdetails.name} for registering for our camp. We look forward to seeing you!`,
          html: `<p>Thank you Dear ${vdetails.name} for registering for our camp. We look forward to seeing you!</p>`,
          name:vdetails.name,
          age:vdetails.age,
          email:vdetails.email,
          address:vdetails.address,
          phoneno:vdetails.phoneno,
          event_name:location.state.ename,
          event_catagory:vdetails.catagory
        });
        alert('Email sent successfully ');
        setvdetails({
          name:"",
          age:"",
          phoneno:"",
          email:"",
          address:"",
          catagory:""
        })
        navigate('/')
      }else{
          alert("please enter all the details!");
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    
  }
  useEffect(()=>{
    if(Object.keys(formErrors).length===0&&isSubmit){
    submitHandler();}
  },[formErrors])
  
const changeHandler=(e)=>{
    setvdetails({...vdetails,[e.target.name]:e.target.value})
}
const handleRegister = async (e) => {
    e.preventDefault()
    setFormErrors(validate(vdetails));
    setIsSubmit(true);
  // try {
  //   await axios.post('http://localhost:5000/volunteer/add', {
  //     to: vdetails.email,
  //     subject: `Thank You for Registering! ${location.state.ename} camp`,
  //     text: `Thank you Dear ${vdetails.name} for registering for our camp. We look forward to seeing you!`,
  //     html: `<p>Thank you Dear ${vdetails.name} for registering for our camp. We look forward to seeing you!</p>`,
  //     name:vdetails.name,
  //     age:vdetails.age,
  //     email:vdetails.email,
  //     address:vdetails.address,
  //     phoneno:vdetails.phoneno,
  //     event_name:location.state.ename,
  //     event_catagory:vdetails.catagory
  //   });
  //   alert('Email sent successfully');
  // } catch (error) {
  //   console.error('Error sending email:', error);
  // }
};

const validate=(values)=>{
  console.log(values.phoneno.length)
  const errors={}
  const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if(!values.name){
    errors.name="Username is required!";
  }
  if(!values.age){
    errors.age="age is required!";
  }
  if(!values.phoneno){
    errors.phoneno="phoneno is required!";
  }else if(values.phoneno.length!==10){
    errors.phoneno="Invalid Phone No!";
  }
  if(!values.catagory){
    errors.category="Category is required!";
  }
  
  if(!values.email){
    errors.email="Email is required!";
  }
  else if(!regex.test(values.email)){
    errors.email="This is not a valid email format";
  }
 
  return errors;
}

    return(
        <div className="items-center justify-center w-screen h-full grid">
            <div className="items-center justify-center w-full">
            <h1 className="py-2">Welcome to the <span className="text-orange-400 text-decoration-line: underline decoration-indigo-500">{location.state.event}</span> Camp</h1>
            <form className="w-full py-1">
                <div >
                <label htmlFor="name" className="text-base font-medium text-gray-900">Name : <input type="text" onChange={changeHandler} value={vdetails.name} name="name" placeholder="Enter Volunteer Name" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/><p className="text-red-700">{formErrors.name}</p></label> <br/>
                <label htmlFor="age" className="text-base font-medium text-gray-900">Age : <input type="number" onChange={changeHandler} value={vdetails.age} name="age" placeholder="Enter Volunteer Age" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/><p className="text-red-700">{formErrors.age}</p></label> <br/>
                <label htmlFor="phoneno" className="text-base font-medium text-gray-900">Phone No : <input type="number" onChange={changeHandler} value={vdetails.phoneno} name="phoneno" placeholder="Enter Volunteer Number" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/><p className="text-red-700">{formErrors.phoneno}</p></label> <br/>
                <label htmlFor="email" className="text-base font-medium text-gray-900">Email : <input type="email" onChange={changeHandler} value={vdetails.email} name="email" placeholder="Enter Volunteer Email Address" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/><p className="text-red-700">{formErrors.email}</p></label> <br/>
                <label htmlFor="catagory" className="text-base font-medium text-gray-900">Category : <input type="text" onChange={changeHandler} value={vdetails.catagory} name="catagory" placeholder="Enter event category" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/><p className="text-red-700">{formErrors.category}</p></label> <br/>
                <label htmlFor="address" className="text-base font-medium text-gray-900">Address : <textarea type="text" onChange={changeHandler} value={vdetails.address} name="address" placeholder="Enter Volunteer Email Address" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"/></label> <br/>
                <button type="button"  className="text-white flex w-full h-1 items-center justify-center rounded-md bg-black px-3.5 py-4 font-semibold leading-7  hover:bg-black/80" onClick={handleRegister}>Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Volenteer;