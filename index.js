const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@autobotcluster.vriex22.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //  client.connect();
    const haiku = client.db("ToyDB").collection("toy");

    app.post("/posttoys", async (req, res) => {
      const user = req.body;
      const result = await haiku.insertOne(user);
      res.send(result);
    });

    app.get("/getalltoys", async (req, res) => {
      const cursor = await haiku.find({}).toArray();
      res.send(cursor);
    });

    app.get("/getalltoys/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const cursor = await haiku.findOne({ _id: objectId });
      res.send(cursor);
    });

    app.get("/getmytoys", async (req, res) => {
      const cursor = await haiku.find({}).toArray();
      res.send(cursor);
    });

    app.get("/getmytoys/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const cursor = await haiku.findOne({ _id: objectId });
      res.send(cursor);
    });

    app.put("/getmytoys/:id", async (req, res) => {
      const id = req.params.id;
      const updateduser = req.body;
      const result = await haiku.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {price: updateduser.price, quantity: updateduser.quantity, description: updateduser.description} }, { upsert: true });
      res.send(result)
    });

    app.delete("/getmytoys/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const cursor = await haiku.deleteOne({ _id: objectId });
      res.send(cursor);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.post('/posttoy', async (req, res) => {
//   const  informations = req.body;

//   // Perform any server-side operations with the received data
//   try {
//     const result = await haiku.insertOne(informations);
//     res.json(result);
//   } catch (error) {
//     console.error('Error saving user data:', error);
//     res.status(500).json({ error: 'Failed to save user data' });
//   }

//   res.json({ message: 'User data received successfully' });
// });

// const { url, pname, sname, semail, scategory, price, rating, quantity, description } = req.body;
// const informations = {
//   url: url,
//   pname: pname,
//   sname: sname,
//   semail: semail,
//   scategory: scategory,
//   price: price,
//   rating: rating,
//   quantity: quantity,
//   description: description,
// };
// const result = await haiku.insertOne(informations);
