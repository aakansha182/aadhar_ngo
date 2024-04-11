import React, { useState,useEffect } from "react";
import hand from "../../../assets/image/hand.png";
import "../../../styles/donate/DonateStyle.css";
import { FaWallet, FaUser, FaGift, FaCamera } from "react-icons/fa";
import loadimg from '../../../assets/loading.gif';
import logoimg from '../../../assets/Aadhar_ngo_logo.jpg';
const loadScript = (src) => {
  return new Promise((reslove) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      reslove(true)
    }
    script.onerror = () => {
      reslove(false)
    }
    document.body.appendChild(script)
  })
}
const Donate = () => {
  const [loading, setloading] = useState(false);
  const iconStyle = { color: "#777", opacity: 0.4 };
  const [donateDetails, setDetails] = useState({
    name: "",
    phoneno: '',
    email: "",
    category:"",
    amount: 0
  })
  const [paymentid,setPaymentId]=useState('');
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);

 
  const changeHandler = (e) => {
    setDetails({ ...donateDetails, [e.target.name]: e.target.value })
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    setFormErrors(validate(donateDetails));
    setIsSubmit(true);
  if(Object.keys(formErrors).length===0){
    PayHandler();

  }
    document.getElementById('donateid').reset();
  }

 
  const validate=(values)=>{
    const errors={}
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.name){
      errors.name="Username is required!";
    }
    if(!values.email){
      errors.email="Email is required!";
    }
    else if(!regex.test(values.email)){
      errors.email="This is not a valid email format";
    }
    if(!values.phoneno){
      errors.phoneno="phone no is required!";
    }else if(values.phoneno.length!==10){
      errors.phoneno="phone no must be 10 characters";
    }

    if(values.amount==0){
      errors.amount="Amount field is empty";
    }
    
    return errors;
  }

  const PayHandler = async () => {
   
    // console.log(donateDetails)
    if(donateDetails.amount>0){
    setloading(true)
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert('Razorpay SDK failed to load, Are you online?')
      return
    }
    const data = await fetch('http://localhost:5000/donate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: donateDetails.amount, dname: donateDetails.name, phoneno: donateDetails.phoneno, email: donateDetails.email,category:donateDetails.category })
    })

    // console.log(data)
    data.json().then(dta => {
      console.log(dta)
      const options = {
        key: 'rzp_test_fAhH6UNJRrS55W',
        amount: dta.amount,
        order_id: dta.id,
        name: 'Aadhaar_Donation',
        description: 'Thank you for Donating!!',
        Image: logoimg,
        handler: function (res) {
          // console.log(res);
          // alert(res.razorpay_payment_id)
          // alert(res.razorpay_order_id)
          // alert(res.razorpay_signature)
          if (res.razorpay_order_id !== undefined) {
            setPaymentId(res.razorpay_order_id);
            fetch('http://localhost:5000/donate/success',
              {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: donateDetails.amount, dname: donateDetails.name, phoneno: donateDetails.phoneno, email: donateDetails.email, payment_id: res.razorpay_order_id, status: true,category:donateDetails.category })

              }).then(data=>data.json())
              .then(res=>{
                console.log(paymentid)
                fetch('http://localhost:5000/donate/generatepdf',{
                  method:'POST',
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ amount: donateDetails.amount, dname: donateDetails.name, phoneno: donateDetails.phoneno, email: donateDetails.email, payment_id: paymentid, status: true,category:donateDetails.category })
  
                }).then(res=>res.json()).then(data=>alert(data.msg)).catch(err=>console.log(err))
              })
              .catch(err=>console.log(err))
          }
        },
        prefill: {
          name: donateDetails.name,
          email: donateDetails.email,
          phoneno: donateDetails.phoneno
        }
      }
      const paymentObject = new window.Razorpay(options)
      setloading(false)
      paymentObject.open()
     
    })
  }else{alert('amount should me greater than zero rupees')}
  }
  return (
    <section className="donate flex items-center -my-10 justify-center ">
      <div className="container ">
        <div className="icon-img h-0">
          <img src={hand} alt="" />
        </div>
        <div className="section-title items-center">
          <h2>How Can You Help</h2>
          <div className="icon-img ">
            {/* <img src={hand} alt="" /> */}
          </div>
          <p className="p">
            Your support is crucial in helping us achieve our mission and make a
            meaningful impact on the lives of those in need.
          </p>
        </div>
        <div className="esther">
          <div className="col-help">
            <div className="help-banner">
              <img src="https://dynamic.brandcrowd.com/template/preview/design/d8b720dc-4c64-4e46-b6b5-5ccbefad97aa?v=4&designTemplateVersion=1&size=design-preview-standalone-1x" alt="" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="single-service">
                <FaWallet size={40} style={iconStyle} />
                <h3>Send Donation </h3>
                <p>
                  Your generous donations enable us to fund <br />
                  our programs and reach more communities in need.
                </p>
              </div>
              <div className="single-service">
                <FaUser size={40} style={iconStyle} />
                <h3>Become Volunteer</h3>
                <p>
                  Join us in our efforts by volunteering your <br />
                  time and skills. Whether it's through hands-on projects
                </p>
              </div>
            </div>
            <div className="column">
              <div className="single-service">
                <FaGift size={40} style={iconStyle} />
                <h3>Make A Gift</h3>
                <p>
                  Your gift will directly support our mission and <br />
                  make a tangible difference in the lives of those we serve.
                </p>
              </div>
              <div className="single-service">
                <FaCamera size={40} style={iconStyle} />
                <h3>Through Media</h3>
                <p>
                  Help us raise awareness about our cause by sharing <br /> our
                  mission with your friends, family, and networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="items-center justify-center w-screen h-full grid pt-5 w-2/5 py-2">
        <div className="items-center justify-center p-10 bg-gray-200">
          <h2 className="text-orange-500">Fill the Form to Donate</h2>
          <form className="w-full py-1" id="donateid">
            <div >
              <label htmlFor="name" className="text-base font-medium text-gray-900">
                Name : <input type="text" placeholder="Enter Donor Name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  value={donateDetails.value} name="name" onChange={changeHandler} /><p className="text-red-700">{formErrors.name}</p></label>
              <br />
              <label htmlFor="phoneno" className="text-base font-medium text-gray-900">
                Phone No : <input type="number" placeholder="Enter Donor Number"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  value={donateDetails.value} name="phoneno" onChange={changeHandler} /><p className="text-red-700">{formErrors.phoneno}</p></label>
              <br />
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                Email : <input type="email" placeholder="Enter Donor Email Address"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  value={donateDetails.value} name="email" onChange={changeHandler} /><p className="text-red-700">{formErrors.email}</p></label> <br />
              <label htmlFor="Category" className="text-base font-medium text-gray-900">
                Category : <select name="category" defaultValue="Education" onChange={changeHandler} placeholder="select one"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="WomenEmpowerment">Women Empowerment</option>
                  <option value="Disabled">Disabled</option>
                  <option value="Feeding">Feeding Food</option>
                </select>
              </label> <br />
              <label htmlFor="amount" className="text-base font-medium text-gray-900">
                Amount : <input type="number" placeholder="Enter Amount"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  value={donateDetails.value} name="amount" onChange={changeHandler} /><p className="text-red-700">{formErrors.amount}</p></label> <br />
              <div className="flex flex-row justify-center items-center">
                {loading ? <img src={loadimg} alt="" width={40} height={40} /> : <button type="button" className="text-white flex w-full h-1 items-center justify-center rounded-md bg-black px-3.5 py-4 font-semibold leading-7  hover:bg-black/80"
                  onClick={submitHandler}>Checkout</button>}
              </div>
            </div>
          </form>
        </div>
      </div>

    </section>
  );
};

export default Donate;

