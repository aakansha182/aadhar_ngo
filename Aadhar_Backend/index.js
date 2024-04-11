const express=require('express');
const cors = require("cors");
const nodemailer=require('nodemailer');
require('dotenv').config();
const bodyparser = require('body-parser');
const app=express();
const PORT=process.env.PORT
require('./models')
const userController=require('./controllers/userController');
const eventController=require('./controllers/eventController');
const volunteerControler=require('./controllers/volunteerControler');
const donateController=require('./controllers/donateController');
const blogsController=require('./controllers/blogsController');
//middleware
app.use(cors());
app.use(express.json({limit:"300mb"}));
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('/Images'));
//user apis
app.post('/adduser',userController.addUser);
app.get('/allusers',userController.getAllUsers);
app.post('/users',userController.getOneUser);
app.get('/users/:id',userController.getOneUserbyId);
app.put('/updateusers/:id',userController.updateUser);
app.delete('/deleteusers/:id',userController.deleteUser);
app.post('/forgetpassword',userController.forgetpassword);
app.post('/resetpassword/:id',userController.resetPassword);
// static images folder
app.use('/Images',express.static('./Images'))
//event apis
app.post('/events/addevent',eventController.uploadimage, eventController.addEvent);
app.get('/events/allevents',eventController.getAllEvents);
app.get('/events/getoneevent/:id',eventController.getOneEvent);
app.put('/events/update/:id',eventController.uploadimage,eventController.updateEvent);
app.delete('/events/delete/:id',eventController.deleteEvent);

//donate apis
app.post('/donate',donateController.paymentInit);
app.post('/donate/success',donateController.storeDonateDB);
app.post('/donate/generatepdf',donateController.sendpdf);
app.get('/getdontiondetails',donateController.getDonationDetails)
app.get('/getonedonation/:email',donateController.getOneDonations)
//volunters apis
app.post('/volunteer/add',volunteerControler.addVolunter);
app.get('/volunteer/getAllVolunteers',volunteerControler.getAllVolunteers);
app.put('/volunteer/editVolunteer/:id',volunteerControler.editVolunteer);
app.get('/volunteer/getVolunteer/:id',volunteerControler.getVolunteer);
app.get('/volunteer/getVolunteerbycat',volunteerControler.getVolunteerbyCat);
app.get('/volunteer/getoneuserevents/:email',volunteerControler.getOneUserEvents);
app.delete('/volunteer/deleteVolunteer/:id',volunteerControler.deleteVolunteer);

//blogs apis
app.post('/blogs/addblog',blogsController.uploadimage,blogsController.addBlog);
app.get('/blogs/getAllBlogs',blogsController.getAllBlogs);
app.get('/blogs/getOneBlog/:id',blogsController.getOneBlog);
app.put('/blogs/updateblog/:id',blogsController.uploadimage,blogsController.updateBlog);
app.delete('/blogs/deleteblog/:id',blogsController.deleteBlog);


app.listen(PORT,()=>console.log("listening at "+PORT)
);
