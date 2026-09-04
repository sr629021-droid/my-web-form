const express =require('express');
const nodemailer=require('nodemailer');
const path=require('path');
const app=express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

const transporter=nodemailer.createTransport({
    service: 'gmail',
    host:'://gmail.com',
    port:465,
    secure: true,
    auth:{
        user:process.env.GMAIL_USER|| 'sr629021@gmail.com',
        pass: process.env.GMAIL_PASS||'gcastevonaaeoctm'
    },
    tls:{
        rejectUnauthorized: false
    }
});
app.post('/submit-form',(req,res)=>{
    const {username,email,phone,message}=req.body;
    const mailOptions={
        from:'sr629021@gmail.com',
        to:'sr629021@gmail.com',
        subject: `New Form Submission from ${username}`,
        text:`You have received a new contact entry:\n\nName: ${username}\nEmail: ${email}\nPhone: ${phone}\nMesaage: ${message}`
    };
    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log(error);
            return res.status(500).send('Something went wrong .Could not send email.');
        }
        res.send('<h1>Form Submitted Successfully!</h1><p>We received your message in our email inbox.</p><a href="/">Go Back</a>');
    });
});
app.listen(PORT, '0.0.0.0' , () =>console.log(`Server running on Port ${PORT}`));