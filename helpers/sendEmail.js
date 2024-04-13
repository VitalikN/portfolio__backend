// // const nodemailer = require('nodemailer');

// const Mailjet = require('node-mailjet');
// const {
//   UKR_NET_EMAIL,
//   UKR_NET_PASSWORD,
//   MJ_APIKEY_PUBLIC,
//   MJ_APIKEY_PRIVATE,
//   MJ_SENDER_EMAIL,
// } = process.env;

// // const nodemailerConfig = {
// //   host: 'smtp.ukr.net',
// //   port: 465,
// //   secure: true,
// //   auth: {
// //     user: UKR_NET_EMAIL,
// //     pass: UKR_NET_PASSWORD,
// //   },
// // };
// // const transporter = nodemailer.createTransport(nodemailerConfig);

// // const sendEmail = async (data) => {
// //   const email = { ...data, from: UKR_NET_EMAIL };
// //   try {
// //     await transporter.sendMail(email);
// //     console.log('Succsess');
// //   } catch (e) {
// //     console.log(e.message);
// //   }
// // };

// // module.exports = sendEmail;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE,
// });

// const request = mailjet.post('send', { version: 'v3.1' }).request({
//   Messages: [
//     {
//       From: {
//         Email: MJ_SENDER_EMAIL,
//       },
//       To: [
//         {
//           Email: 'ripomet813@rartg.com',
//           Name: 'passenger 1',
//         },
//       ],
//       Subject: 'Your email flight plan!',
//       TextPart:
//         'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
//       HTMLPart:
//         '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
//     },
//   ],
// });

// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.error(err.statusCode, err.response.body);
//   });
