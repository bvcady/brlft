import sgMail from "@sendgrid/mail";
import { render } from "@react-email/components";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import MagicLinkEmail from "../../../../emails/magic";

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    res.status(500).json({ message: "Please provide a valid Mongo URI" });
  }

  const getGuestsCollection = async () => {
    const init = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });

    const client = await init.connect();

    const db = client.db("brlft");
    return db.collection("guests");
  };

  const sendEmail = async ({ name, email, token }) => {
    const API_KEY = process.env.SENDGRID_API_KEY;

    const emailHtml = render(
      MagicLinkEmail({
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
    await sgMail.send(msg);
  };

  if (method === "POST") {
    const guests = await getGuestsCollection();

    const { body } = req;

    const { name, email, type } = JSON.parse(body);

    if (!body || !email || !type) {
      res.status(400).json({ status: 400, message: "The request was missing data" });
    }

    try {
      const query = { email };
      const queriedUser = await guests.findOne(query);
      if (!queriedUser) {
        const timestamp = new Date().toISOString();
        const newUser = await guests.insertOne({
          name,
          email,
          type,
          timestamp,
        });

        const token = jwt.sign({ id: newUser.insertedId.toString() }, process.env.JWT_SECRET, {
          expiresIn: 15 * 60,
        });

        await sendEmail({ token, name, email });

        res
          .status(200)
          .json({ status: 200, message: `Validation magic link send via email to ${email}` });
      }

      const token = jwt.sign({ id: queriedUser._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: 15 * 60,
      });

      await sendEmail({ token, name, email });

      res
        .status(200)
        .json({ status: 200, message: `Validation magic link send via email to ${email}` });
    } catch (e) {
      res.status(500).json({ status: 500, message: e });
    }
  }
  if (method === "GET") {
    const guests = await getGuestsCollection();

    const { cookies } = req;
    const { "brlft-auth-token": token = "" } = cookies;

    if (!token) {
      res.status(400).json({ status: 400, message: "The request was missing token" });
    }

    try {
      const payload = jwt.verify(token as string, process.env.JWT_SECRET);

      // @ts-ignore
      const { id } = payload;

      const guest = await guests.findOne({ _id: new ObjectId(id) });

      if (!guest) {
        res.status(404).json({ status: 404, message: "Guest not found" });
      }

      res.status(200).json({ status: 200, data: guest });
    } catch (e) {
      res.status(500).json({ status: 500, message: e.message });
    }
  }
  // if (method === 'PUT') {}
  // if (method === 'DELETE') {}
  res.end();
};

export default handler;
