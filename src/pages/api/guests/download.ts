import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { stringify } from "csv-stringify";
import { Guest, Person } from "../../../types";

type GuestWithId = Guest & { _id: ObjectId };

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
      const allGuests = (await guests.find().toArray()) as GuestWithId[];

      // console.log({ allGuests });

      const guestsNotValidated = allGuests
        ?.filter(({ validated }) => !validated)
        .map(({ name, type, email }) => {
          return {
            name,
            type,
            email,
            completed: "false",
            validated: "false",
          };
        });

      const guestsInDoubt = allGuests
        ?.filter(({ validated, people }) => validated && !people?.length)
        .map(({ name, type, email }) => {
          return {
            name,
            type,
            email,
            validated: "true",
            completed: "false",
          };
        });

      const validatedPeople = allGuests
        ?.map((guest) => {
          return guest?.people?.map((p) => {
            return {
              ...p,
              email: guest.email,
              with: guest.name,
              validated: "true",
              completed: "true",
            };
          });
        })
        ?.reduce((acc, p) => [...acc, ...(p || [])], []);

      const peopleOfGuests = validatedPeople?.filter((guest) => guest.type !== "niet");

      const peopleNotComing = validatedPeople?.filter((guest) => guest.type === "niet");

      const csvData = stringify(
        [...peopleOfGuests, ...guestsInDoubt, ...guestsNotValidated, ...peopleNotComing],
        {
          columns: ["name", "with", "email", "type", "diet", "know", "validated", "completed"],
          header: true,
          quoted: true,
          delimiter: ";",
        },
      );

      // Set response headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=allGuests.csv");

      // Send the CSV as the response
      return res.status(200).send(csvData);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 500, message: e });
    }
  }

  return res.end();
};

export default handler;
