const express =require('express');
const nodemailer=require('nodemailer');
const path=require('path');
const app=express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get('/' ,(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
app.listen(PORT, '0.0.0.0' , () =>console.log(`Server running on Port ${PORT}`));