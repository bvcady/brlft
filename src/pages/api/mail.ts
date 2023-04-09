import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import sgMail from "@sendgrid/mail";
import { render } from "@react-email/components";
import NotionMagicLinkEmail from "../../../emails/magic";

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  console.log("mail req sent");

  if (method === "POST") {
    const { name, email, type } = req.query;

    if (!email) {
      res.status(400).end();
    }

    const token = jwt.sign({ email, name, type }, "VERY_SECRET", { expiresIn: 15 * 60 });

    const API_KEY = process.env.SENDGRID_API_KEY;
    const emailHtml = render(
      NotionMagicLinkEmail({
        name: name as string,
        origin: req.headers.origin,
        token,
      }),
    );

    sgMail.setApiKey(API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "brlft@brlft.nl", // Change to your verified sender
      subject: "De bruiloft van Lisa en Bob",
      text: `Hallo ${name}, bedankt voor je reactie op onze uitnodiging`,
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

    res.status(200).json(token);
  }

  res.end();
  // if (method === 'POST') {}
  // if (method === 'PUT') {}
  // if (method === 'DELETE') {}
};

export default handler;
