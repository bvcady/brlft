import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

import sgMail from "@sendgrid/mail";

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "bobb.verheij@gmail.com", // Change to your recipient
      from: "brlft@brlft.nl", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    res.status(200).end();
  }

  res.end();
  // if (method === 'POST') {}
  // if (method === 'PUT') {}
  // if (method === 'DELETE') {}
};

export default handler;
