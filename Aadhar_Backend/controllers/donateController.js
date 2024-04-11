const db=require('../models')
const Donate=db.donate;
const Razorpay = require("razorpay")
const { v4: uuidv4 } = require('uuid');
const nodemailer=require('nodemailer');
const fs=require('fs');
const path=require('path');
const fileURLToPath=require('url');
const PDFDocument=require('pdfkit');
const razorpay=new Razorpay({
    key_id:'rzp_test_fAhH6UNJRrS55W',
    key_secret:'MvFrSpq0WbrJjGLUwthQnK6B'
})


const paymentInit = async (req,res) =>{
    try{
        const payment_capture=1;
        const amt=req.body.amount;
        const currency='INR';
// console.log(req.body);
        const options={
            amount:amt*100,
            currency,
            receipt:uuidv4(),
            payment_capture
        }
      const response=await razorpay.orders.create(options)
      console.log(response)
      res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount
      });
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

const storeDonateDB=async (req,res)=>{
    try{
        let don_details={
            dname:req.body.dname,
            phoneno:req.body.phoneno,
            email:req.body.email,
           amount:req.body.amount,
           payment_id:req.body.payment_id,
           donstatus:req.body.status,
           category:req.body.category
           }
           console.log(req.body.status)
           const donresp=await Donate.create(don_details)
           res.status(200).send(donresp);
    }catch(e){
        console.log(e);
    }
}

const generatePdf = async (donordata) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const __dirName = path.dirname(__filename);
        const pdfPath = path.join(__dirName, `${donordata.dname}_receipt.pdf`);
        const writeStream = fs.createWriteStream(pdfPath);
        
        doc.pipe(writeStream);
        doc.fontSize(25).text('Aadhar Donation Payment Receipt', 100, 50);
        doc.text(`Donor Name: ${donordata.dname}`, 100, 100);
        doc.text(`Amount: ${donordata.amount}`, 100, 150);
        doc.text(`Category: ${donordata.category}`, 100, 200);
        doc.text(`Payment ID: ${donordata.payment_id}`, 100, 250);


        doc.end();
        
        writeStream.on('finish', function () {
            console.log('PDF generation finished.');
            resolve(pdfPath);
        });

        writeStream.on('error', function (err) {
            console.log('PDF generation error:', err);
            reject(err);
        });
    });
};

const sendemail = async (email, subject, text, attachments = []) => {
    console.log('Sending email to:', email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aadhar.foundation.gethelp@gmail.com',
            pass: process.env.Email_Pass
        }
    });
    
    const mailOptions = {
        from: 'aadhar.foundation.gethelp@gmail.com',
        to: email,
        subject: subject,
        text: text,
        attachments: attachments,
        html: `<p>With Regards</p>
        <p>--Team AADHAR</p>`
    };
  
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Email sending error:', error);
        throw new Error('Failed to send email');
    }
};

const sendpdf = async (req, res) => {
    console.log(req.body.payment_id)
    try {
        const pdfpath = await generatePdf(req.body);
        await sendemail(req.body.email, 'Your Payment Receipt', 'Please find attached your payment receipt.', [{
            filename: `${req.body.dname}_receipt.pdf`,
            path: pdfpath
        }]);
        console.log('Email sent successfully.');
        res.status(200).send({msg:'please check your email the donation has successfully done'});
    } catch (e) {
        console.log('Error:', e);
        res.status(500).send({msg:'Internal Server Error'});
    }
};

const getDonationDetails=async(req,res)=>{
try{
    const resp=await Donate.findAll({})
    res.status(200).json(resp);
}catch(e){console.log(e)}
}
const getOneDonations=async(req,res)=>{
    let email=req.params.email;
try{
    const resp=await Donate.findAll({where:{email:email}})
    res.status(200).send([resp]);
}catch(e){console.log(e)}
}
module.exports={
    paymentInit,
    storeDonateDB,
    getDonationDetails,
    getOneDonations,
    sendpdf
}