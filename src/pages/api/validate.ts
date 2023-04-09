import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

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

  if (method === "POST") {
    try {
      const guests = await getGuestsCollection();

      const { body } = req;

      const { token } = JSON.parse(body);

      if (!token) {
        res.status(400).json({ status: 400, message: "The request was missing token" });
      }

      const payload = jwt.verify(token, "VERY_SECRET");

      // @ts-ignore
      const { id } = payload;

      const guest = await guests.findOne({ _id: new ObjectId(id) });

      if (!guest) {
        res.status(400).json({ message: "Guest not found", status: 400 });
      }

      if (guest) {
        const authToken = jwt.sign({ id: guest._id.toString() }, "VERY_SECRET", {
          expiresIn: "180 days",
        });
        setCookie("brlft-auth-token", authToken, { res, req, maxAge: 31557600 / 2 });
        res.status(200).json({ message: "Succesfully logged on", status: 200 });
      }
    } catch (e) {
      res.status(500).json({ status: 500, message: e.message });
    }
  }
  res.end();
  // if (method === 'GET') {}
  // if (method === 'PUT') {}
  // if (method === 'DELETE') {}
};

export default handler;
