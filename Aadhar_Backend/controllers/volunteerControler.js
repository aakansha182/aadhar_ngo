const db=require('../models')
const Volunteer= db.Volunteer;
const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:465,
  secure:true,
  logger:true,
  debug:true,
  secureConnection:false,
  auth: {
    user: 'aadhar.foundation.gethelp@gmail.com',
    pass: process.env.Email_Pass
  //   ftpx zqwr kjrf sbek
  },
  tls:{
      rejectUnauthorized:true
  }
});

const addVolunter=async(req,res)=>{
    let details={
        vname:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        event_name:req.body.event_name,
        address:req.body.address,
        event_catagory:req.body.event_catagory
    }
  
    const { to, subject, text, html } = req.body;
  
    const mailOptions = {
      from: 'aadhar.foundation.gethelp@gmail.com',
      to,
      subject,
      text,
      html
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
    
    const resp=await Volunteer.create(details)
    res.status(200).json(resp);

}

const editVolunteer=async(req,res)=>{
  let id=req.params.id;
  try{
    const resp=await Volunteer.update(req.body,{where:{id : id}})
    res.status(200).send(resp);
    }catch(e){
        console.log(e);
    }
}
const getAllVolunteers=async(req,res)=>{
    const resp=await Volunteer.findAll({})
    res.status(200).json(resp);
}
const getVolunteer=async(req,res)=>{
  let id=req.params.id;
  console.log("get volunterr id ",id)
    const resp=await Volunteer.findOne({where:{id:id}})
    res.status(200).json(resp);
}
const getOneUserEvents=async(req,res)=>{
  let email=req.params.email;
  console.log("in get event",email)
  const resp=await Volunteer.findAll({where:{email : email}})
  console.log([resp])
  res.status(200).send([resp]);
}

const getVolunteerbyCat=async(req,res)=>{
  let ename=req.body.event_name;
  let catagory=req.body.event_catagory;
  try{
    const resp=await Volunteer.findAll({where:{event_name:ename ,event_catagory:catagory}})
    res.status(200).json(resp);
  }catch(err){
    console.log(err);
  }
}

const deleteVolunteer=async(req,res)=>{
    let id=req.params.id;
    const resp=await Volunteer.destroy({where:{id:id}})
    res.status(200).json({msg:"volunteer deleted succesfully!!"});
}
module.exports={
    addVolunter,
    getAllVolunteers,
    getVolunteerbyCat,
    deleteVolunteer,
    editVolunteer,
    getVolunteer,
    getOneUserEvents
}

