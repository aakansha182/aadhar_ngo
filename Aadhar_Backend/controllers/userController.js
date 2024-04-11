const db=require('../models')
const nodemailer=require('nodemailer');
//create mail Model
const User= db.user;

const addUser=async (req,res)=>{

    let details={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        userType:req.body.user
    }

    const userresp=await User.create(details)
    console.log(userresp.toJSON());
    res.status(200).send({email:userresp.email,name:userresp.name,user:userresp.userType});
}

const getAllUsers=async(req,res)=>{
    let details=await User.findAll({
        attributes:['id','name','email','userType']
    })
    // details=JSON.stringify(details)
    res.status(200).send(details);
    //res.status(200).json({data:details})
}

const getOneUser=async (req,res)=>{
    let email=req.body.email;
    // console.log(email)
    let userresp=await User.findOne({where:{ email : email }})
    console.log(userresp)
    try{
        if(userresp==null){
            res.send({email:null,password:null})
            return;
        }
    if((userresp!=null)&&(userresp.password===req.body.password)){
        res.status(200).json({email:userresp.email,name:userresp.name,user:userresp.userType,msg:"ok"})
    }else{
        res.status(500).json({email:userresp.email,msg:'the password is wrong'})
    }
}catch(e){

    console.log(e)
}
    
}
const getOneUserbyId=async (req,res)=>{
    let id=req.params.id;
    console.log(id)
    let userresp=await User.findOne({where:{ id : id }})
    try{
        res.status(200).json({email:userresp.email,name:userresp.name,user:userresp.userType,msg:"ok"})
        
    }catch(e){
    console.log(e)
}
}

const updateUser=async (req,res)=>{
    console.log(req.body)
    let id=req.params.id
    console.log('id',id)
    let userresp=await User.update(req.body,{where:{id:id}})
    res.status(200).send(userresp)
}

const deleteUser=async(req,res)=>{
    let id=req.params.id
    console.log(id);
    await User.destroy({where:{id:id}})
    res.status(200).send("deleted successfully!")
}

const forgetpassword=async(req,res)=>{
   try{
    let user=await User.findOne({where:{email:req.body.email}});
    console.log("****************",user,"**************")
    if(!user){return res.send({Status:"User not existed"})}
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

      const mailOptions = {
        from: 'aadhar.foundation.gethelp@gmail.com',
        to:req.body.email,
        subject:"Reset Your Password",
        text:`http://localhost:3000/reset-password/${user.id}`
        
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
    }catch(err){
        console.log("in catch err",err);
    }

}

const resetPassword=async(req,res)=>{
    console.log('/////////////////',req.body.password)
    const id=req.params.id;
    console.log(id);
    let userresp=await User.update(req.body,{where:{id:id}})
    console.log(userresp)
    res.status(200).send(userresp)
}
// user.findAll({where:{catagory:cat}})
module.exports={
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getOneUserbyId,
    forgetpassword,
    resetPassword
}