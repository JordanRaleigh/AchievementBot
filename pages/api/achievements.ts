import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";
import { getCookieValue, parseCookies } from "next-universal-cookies";

const { MongoClient, ServerApiVersion } = require("mongodb");
export default handler;

const URI = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.8e8eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();

  const db = client.db("pie");

  switch (req.method) {
    case "GET":
      debugger;
      const username = req.query.user;
      const query = { username: username };
      console.log("username", username);
      const achievements = await db
        .collection("achievements")
        .find(query)
        .toArray();

      return res.status(200).json(achievements);

    case "POST":
      const result = await db.collection("achievements").insertOne(req.body);

      return res.status(200).json(result);
  }
}
