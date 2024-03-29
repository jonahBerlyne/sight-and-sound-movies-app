const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.EMAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.EMAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.EMAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

const sendEmail = async (to: string, url: string, txt: string) => {
 const _OAuth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_PLAYGROUND
 );
 _OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

 try {
  const accessToken = await _OAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
   service: "gmail",
   auth: {
    type: "OAuth2",
    user: SENDER_MAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken
   },
  });

  const mailOptions = {
   from: SENDER_MAIL,
   to,
   subject: "Verify email for Sight and Sound Movies App",
   html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome</h2>
     <p>
      Congratulations! You're almost set to start using the sight-and-sound-movies-app. Just click the button below to validate your email address.
     </p>
     <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
     <p>If the button doesn't work for any reason, you can also click on the link below:</p>
     <div>${url}</div>
    </div>
   `,
  };

  const result = await transport.sendMail(mailOptions);

  return result;
 } catch (error) {
  console.log(error);
 }
}

export default sendEmail;