var nodemailer = require('nodemailer'); 
nodemailer.sendmail = true;

var smtpTransport = nodemailer.createTransport("POP",{
   service: "Gmail",
   auth: {
       user: "pktippa@gmail.com",
       pass: "password"
   }
});

smtpTransport.sendMail({
   from: "pktippa@gmail.com", // sender address
   to: "pktippa@gmail.com", // comma separated list of receivers
   subject: "Hello", // Subject line
   text: "Hello world" // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
