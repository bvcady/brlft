import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ message: "Please provide a valid Mongo URI" });
  }

  const getGuestsCollection = async () => {
    const init = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });

    const client = await init.connect();

    const db = client.db("brlft");
    return db.collection("guests");
  };

  if (method === "GET") {
    const guests = await getGuestsCollection();

    try {
      const allGuests = await guests.find({ name: "Bob" }).toArray();

      console.log({ allGuests });

      return res.status(200).json({ status: 200, data: allGuests });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e });
    }
  }

  return res.end();
};

export default handler;
