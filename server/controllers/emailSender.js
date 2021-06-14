const nodemailer = require("nodemailer");
const moment= require('moment') 
//const cron = require("node-cron");
var schedule = require("node-schedule");

const emailSend = (data) => {
  //console.log(data);
  const { next_pap, patient_email, email_subject, email_text } = data;

 console.log(data)
  // Create mail transporter.
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Sending emails every one minute.
  let cronJob = "task_" + patient_email;
/*   console.log({cronJob})
  const dateJ = new Date(2021, 06, 10, 14, 36, 0);
  console.log({dateJ})
  const startTime = new Date(Date.now() + 5000);
  console.log({startTime})
  const startNow= new Date(Date.now());
  console.log({startNow}) */

/*   let offset = -4
  const startNowChile = new Date(Date.now()+ (3600000*offset));
  const startNowChileplus60 = new Date(Date.now()+ (3600000*offset)+120);
  console.log({startNowChileplus60})
  let date = new Date(2021, 06, 10, 16, 31, 0); */
  
  //console.log(next_pap)
  //date = new Date(Date.now()+ 50000);
  //date1 = Date.parse(next_pap)

  const myDate = moment(next_pap, 'YYYY-MM-DD, HH:mm:ss').toDate();

  console.log("myDate" + myDate)
/*   //date.setHours(date.getHours() + 4)
  //console.log(date)
  //console.log(typeof date)
  console.log(typeof myDate)
  console.log(date)
  console.log(date1) */

  //cronJob = schedule.scheduleJob("* * * * *", function () {
    cronJob = schedule.scheduleJob(patient_email,myDate, function () {
    console.log("---------------------");
    console.log("Running Cron Job");

    let messageOptions = {
      from: "papemailsender@gmail.com",
      to: `${patient_email}`,
      subject: `${email_subject}`,
      text: `${email_text}`,
    };

    //`task_${patient_email}`.start();

    transporter.sendMail(messageOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  });

  return cronJob;
};

const emailStop = (data) => {
  //console.log({ data });
  const x = data.cancel();
  console.log(x);
  return x
};
module.exports = { emailSend, emailStop };
//export default emailSend;
