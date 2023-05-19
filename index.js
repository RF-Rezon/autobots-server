const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
require('dotenv').config();
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@autobotcluster.vriex22.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err){
    console.log("MongoDb connection problem.")
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})