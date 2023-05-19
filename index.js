const { MongoClient, ServerApiVersion } = require("mongodb");
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
    await client.connect();
    const haiku =  client.db("ToyDB").collection("toy");

    app.post("/posttoys", async(req, res)=>{
    const user = req.body;
    const result = await haiku.insertOne(user);
    res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
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
