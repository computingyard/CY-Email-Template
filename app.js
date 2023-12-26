require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const nodemailer = require("nodemailer");
const cors = require("cors")
const fs = require('fs');
const { promisify } = require('util');
const { getText, getHTML } = require("./template");

app.use(cors())
app.use(express.json());
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
app.use(awsServerlessExpressMiddleware.eventContext());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.get("/", (req, res) => {
  return res.send("Hello from Computing Yard.");
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

const acceptedOrigins = [
  "https://connectinnovative.com",
  "https://www.connectinnovative.com",
  "http://localhost:3000",
  "https://computingyard.com",
  "https://www.computingyard.com",
];

app.post("/cyemail", async (req, res) => {
  const { firstName, lastName, email, phone, message, budget, file } = req.body;
  if (!acceptedOrigins.includes(req.headers.origin)) {
    return res.status(400).json({
      success: false,
      message: "YOU ARE NOT AUTHORIZED TO USE THIS API",
      origin: req.headers.origin,
    });
  } else if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required parameters" })
  }
  transporter.sendMail({
    to: process.env.USER,
    from: process.env.USER,
    subject: `Message from ${firstName} ${lastName} at computing yard's website`, // Subject line
    html: `User Details are:
    firstName: ${firstName}<br/>
    lastName: ${lastName}<br/>
    email: ${email} <br/>
    phone: ${phone || "-"}<br/>
    message: ${message} <br/>
    budget: ${budget}<br/>
    file: ${file || "-"}<br/>
    `,
  });

  const text = getText(firstName, lastName);
  transporter
    .sendMail({
      from: process.env.USER,
      to: `${email}`,
      subject: `Thank you ${firstName} ${lastName} `,
      text,
      //  html: await readFile("./email-template.html"),
      html: getHTML({ firstName, lastName }),
    })
    .then(() => {
      console.log("rq", req.body);
      res.status(200).json({
        success: true,
        message: "Email successfully sent",
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json({
        success: true,
        message: err.message,
      });
    });

})


app.listen(port, () => {
  console.log(`CY Server listening at http://localhost:${port}`)
})

module.exports = app;
