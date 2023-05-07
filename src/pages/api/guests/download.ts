import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { stringify } from "csv-stringify";

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
      const allGuests = await guests.find().toArray();

      const reducedData = allGuests.reduce((acc, g) => [...acc, ...(g.people || [])], []);
      console.log(reducedData);
      const csvData = stringify(reducedData, {
        columns: ["name", "type", "diet", "know"],
        header: true,
        quoted: true,
        delimiter: ";",
      });

      // Set response headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=allGuests.csv");

      // Send the CSV as the response
      return res.status(200).send(csvData);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e });
    }
  }

  return res.end();
};

export default handler;
