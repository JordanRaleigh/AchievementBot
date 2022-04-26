import type { NextApiRequest, NextApiResponse } from "next";

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
      const username = req.query.user;
      const query = { username: username };
      console.log("username", username);
      const achievements = await db
        .collection("achievements")
        .find(query)
        .toArray();

      return res.status(200).json(achievements);

    case "POST":
      console.log("hey here post 1");
      const result = await db.collection("achievements").insertOne(req.body);
      console.log("hey here post 2");
      return res.status(200).json(result);
  }
}
