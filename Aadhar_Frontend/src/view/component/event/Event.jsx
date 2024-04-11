import React, { useEffect, useState } from "react";
import "../../../styles/event/EventStyle.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Event = () => {
  const Navigate=useNavigate();
  const [file,setFile] = useState();
  const [fdata,setfdata] = useState();
  useEffect(()=>{
   fetch('http://localhost:5000/events/allevents')
   .then(data=>data.json())
   .then(data=>setfdata(data))
    .catch(err=>console.log(err))
  },[])
  console.log(fdata)
  return (
    <section className="event" id="event">
      <h2 className="event-heading">Event's</h2>
      <div className="event-content">
        {/* <h3>Latest Causes</h3> */}
        <p className="p">
          Aadhar we take great pride in our commitment to serving communities in
          need and making a positive <br />
          impact on the lives of those facing adversity. Over the years, we've
          had the privilege of organizing <br />
          various events and initiatives aimed at bringing hope, support, and
          opportunities to marginalized groups.
        </p>
      </div>
      
      <div className="row items-center justify-center flex">
      {
       fdata && fdata.map(item=>{
          return(
        <div className="sec-row items-center justify-center flex">
          <div className="single-cause mb-30">
            <img src={`http://localhost:5000/${item.image}`} alt="" />
            <div className="cause-info2">
                <h1>Event Name: <br/>{item.ename}</h1>
                <h1 className="items-center">Category: {item.catagory}</h1>
              <p>{item.description}</p>
              <div className="cause-meta">
                <button className="button theme-bg" onClick={()=>{
                  Navigate('/volunteer',{state:{ename:item.ename}})
                }}>want to Volenteer</button>
              </div>
            </div>
          </div>
        </div>
       
        )
        })
      }
      </div>
        
      {/* <div>
        <input type="file" name="" id="" onChange={e=>setFile(e.target.files[0])} accept="image/*"/>
        <button onClick={()=>{
          const formDta = new FormData();
          formDta.append("image",file);
          formDta.append("ename","Manish");
          formDta.append("catagory","ssrrr")
          formDta.append("description","ss")
          axios.post("http://localhost:5000/events/addevent",formDta,{
            withCredentials:true
          }).then(resp=>{
            console.log(resp);
          }).catch(Err=>{
            console.log(Err);
          })
        }}>send image</button>
      </div> */}
      {/* <div>
        {
       fdata && fdata.map(item=>{
          return(
            <>
            <img src={`http://localhost:5000/${item.image}`}/>
            <h1>{item.ename}</h1>
            <h1></h1>
            <h1>{item.description}</h1>
            </>
          )
        })
      }
      </div> */}
    </section>
  );
};

export default Event;
