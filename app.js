const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const nodemailer = require("nodemailer");
const cors = require("cors")
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

app.use(cors())
app.use(express.json());
require('dotenv').config()
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
app.use(awsServerlessExpressMiddleware.eventContext());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.header('Access-Control-Allow-Methods', '*');
  next();
});

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});


app.post("/cyemail", async(req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.message) {
    return res.status(400).json({ success: false, message: "Missing required parameters" })
  }
  transporter.sendMail({
    from: process.env.USER, // sender address
    to: process.env.USER, // list of receivers
    subject: `Message from ${req.body.firstName} ${req.body.lastName} at computing yard's website`, // Subject line
    html: `User Details are:  firstName: ${req.body.firstName} lastName: ${req.body.lastName} email:${req.body.email} <br/><br/>  ${req.body.message} <br/>
            `, // html body
  });
  transporter.sendMail({
    from: process.env.USER, // sender address
    to: `${req.body.email}`,
    subject: `Thank you ${req.body.firstName} ${req.body.lastName} `, // Subject line
    html: await readFile('./EmailTemplete.html'), // html body
  }).then(() => {
    console.log("rq", req.body);
    res.status(200).json({
      success: true,
      message: "Email successfully sent"
    })
  }).catch((err) => {
    console.log("err", err)
    res.status(400).json({
      success: true,
      message: err.message
    })
  })

})


app.listen(port, () => {
  console.log(`CY Server listening at http://localhost:${port}`)
})

module.exports = app;
