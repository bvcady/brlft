import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Person } from "../../rsvp";

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

    const { cookies } = req;
    const { "brlft-auth-token": token = "" } = cookies;

    if (!token) {
      res.status(400).json({ status: 400, message: "The request was missing token" });
    }

    const { body } = req;

    if (!body) {
      res.status(400).json({ status: 400, message: "The request was missing data" });
    }

    try {
      const payload = jwt.verify(token as string, process.env.JWT_SECRET);

      // @ts-ignore
      const { id } = payload;

      const guest = await guests.findOne({ _id: new ObjectId(id) });

      if (!guest) {
        res.status(404).json({ status: 404, message: "Guest not found" });
      }

      const person = JSON.parse(body);
      const people = (
        guest.people
          ? [...guest.people.filter((p: Person) => p.id !== person.id), person]
          : [person]
      ).sort((a, b) => a.name.localeCompare(b.name));

      await guests.updateOne(
        { _id: new ObjectId(id) },
        { $set: { people: [...people] } },
        { upsert: true },
      );

      const updatedGuest = await guests.findOne({ _id: new ObjectId(id) });

      console.log(updatedGuest);

      res.status(200).json({ status: 200, message: "Succesfully added guest" });
    } catch (e) {
      res.status(500).json({ status: 500, message: e });
    }
  }

  if (method === "DELETE") {
    const guests = await getGuestsCollection();

    const { cookies } = req;
    const { "brlft-auth-token": token = "" } = cookies;

    if (!token) {
      res.status(400).json({ status: 400, message: "The request was missing token" });
    }

    const { body } = req;

    if (!body) {
      res.status(400).json({ status: 400, message: "The request was missing data" });
    }

    try {
      const payload = jwt.verify(token as string, process.env.JWT_SECRET);

      // @ts-ignore
      const { id } = payload;

      const guest = await guests.findOne({ _id: new ObjectId(id) });

      if (!guest) {
        res.status(404).json({ status: 404, message: "Guest not found" });
      }

      const person = JSON.parse(body);
      const people = guest.people
        ?.filter((p) => p.id !== person.id)
        .sort((a, b) => a.name.localeCompare(b.name));

      await guests.updateOne(
        { _id: new ObjectId(id) },
        { $set: { people: [...people] } },
        { upsert: true },
      );

      const updatedGuest = await guests.findOne({ _id: new ObjectId(id) });

      console.log(updatedGuest);

      res.status(200).json({ status: 200, message: "Succesfully added guest" });
    } catch (e) {
      res.status(500).json({ status: 500, message: e });
    }
  }
};

export default handler;
