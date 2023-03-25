import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

import sgMail from "@sendgrid/mail";
import { render } from "@react-email/components";
import NotionMagicLinkEmail from "../../../emails";

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    const API_KEY = process.env.SENDGRID_API_KEY;
    const emailHtml = render(NotionMagicLinkEmail({ token: "whatever this is" }));

    sgMail.setApiKey(API_KEY);
    const msg = {
      to: "bobb.verheij@gmail.com", // Change to your recipient
      from: "brlft@brlft.nl", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: emailHtml,
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
