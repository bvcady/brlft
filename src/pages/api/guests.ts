import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

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
    const guests = await getGuestsCollection();
    const { body } = req;

    if (!body) {
      try {
        const mongoResponse = await guests.updateOne(
          { name: "Mock" },
          { $set: { timestamp: new Date().toISOString() } },
          { upsert: true },
        );
        if (mongoResponse.acknowledged) {
          res.status(200).json({ message: "Mock user successfully added." });
        }
      } catch (e) {
        res.status(500).json({ message: "Something went wrong", error: e.message });
      }
    }
    try {
      const timestamp = new Date().toISOString();
      const guest = JSON.parse(body);
      const mongoResponse = await guests.updateOne(
        { email: guest.email },
        { $set: { ...guest, timestamp } },
        { upsert: true },
      );
      if (mongoResponse.acknowledged) {
        res
          .status(200)
          .json({ message: "User successfully added.", data: { ...guest, timestamp } });
      }
    } catch (e) {
      res.status(500).json({ message: "Something went wrong", error: e.message });
    }
  }
  res.end();
  // if (method === 'POST') {}
  // if (method === 'PUT') {}
  // if (method === 'DELETE') {}
};

export default handler;
