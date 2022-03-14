import type { NextApiRequest, NextApiResponse } from "next";

const { MongoClient, ServerApiVersion } = require("mongodb");
export default handler;

const mockAchievement = {
  user: "bob",
  text: "Got into PIE",
};
const URI = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.8e8eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case "GET":
      const client = new MongoClient(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      await client.connect();

      const db = client.db("sample_mflix");

      const query = { username: "michaelsholty" };

      const achievement = await db.collection("achievements").findOne(query);

      console.log(achievement);

      res.status(200).json(achievement);
  }
}
